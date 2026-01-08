import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import nodemailer from 'nodemailer'
import Joi from 'joi'
import dotenv from 'dotenv'
import { v4 as uuidv4 } from 'uuid'
import { open } from 'sqlite'
import sqlite3 from 'sqlite3'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

// Configuration sécurité
app.use(helmet())
app.use(cors({
  origin: process.env.NODE_ENV === 'production'
    ? 'https://votre-domaine.ch'
    : ['http://localhost:5173', 'http://localhost:3000']
}))

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 messages max par IP
  message: { error: 'Trop de messages, veuillez réessayer plus tard' }
})
app.use('/api/contact', limiter)

app.use(express.json())

// Database SQLite
let db

const initDb = async () => {
  db = await open({
    filename: './messages.db',
    driver: sqlite3.Database
  })

  await db.exec(`
    CREATE TABLE IF NOT EXISTS messages (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT,
      subject TEXT NOT NULL,
      device TEXT,
      issue TEXT,
      message TEXT NOT NULL,
      status TEXT DEFAULT 'new',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `)
}

// Validation schema
const contactSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().optional(),
  subject: Joi.string().valid('devis', 'question', 'sav', 'partenariat').required(),
  device: Joi.string().optional(),
  issue: Joi.string().optional(),
  message: Joi.string().min(10).max(1000).required()
})

// Configuration email transporteur
const transporter = nodemailer.createTransporter({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
})

// Route POST contact
app.post('/api/contact', async (req, res) => {
  try {
    // Validation
    const { error, value } = contactSchema.validate(req.body)
    if (error) {
      return res.status(400).json({
        error: 'Données invalides',
        details: error.details[0].message
      })
    }

    // Générer ID unique
    const messageId = uuidv4()

    // Sauvegarder en base
    await db.run(
      `INSERT INTO messages (id, name, email, phone, subject, device, issue, message)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [messageId, value.name, value.email, value.phone, value.subject, value.device, value.issue, value.message]
    )

    // Préparer email admin
    const emailContent = `
      Nouveau message de contact - ${value.subject}

      Nom: ${value.name}
      Email: ${value.email}
      Téléphone: ${value.phone || 'Non spécifié'}

      ${value.device ? `Appareil: ${value.device}` : ''}
      ${value.issue ? `Problème: ${value.issue}` : ''}

      Message:
      ${value.message}

      ---
      Message ID: ${messageId}
      Date: ${new Date().toLocaleString('fr-CH', { timeZone: 'Europe/Zurich' })}
    `

    // Envoyer email admin
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: process.env.ADMIN_EMAIL,
      subject: `[FixPhone] ${value.subject === 'devis' ? 'Demande de devis' : 'Nouveau message'} - ${value.name}`,
      text: emailContent,
      html: emailContent.replace(/\n/g, '<br>')
    })

    // Email confirmation client
    const clientEmailContent = `
      Bonjour ${value.name},

      Nous avons bien reçu votre message et vous en remercions.
      Notre équipe va traiter votre demande et vous répondra dans les plus brefs délais.

      Référence: ${messageId}

      Cordialement,
      L'équipe FixPhone Porrentruy

      ---
      Esplanade, 2900 Porrentruy
      +41 22 731 84 56
      info@fixphone.ch
    `

    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: value.email,
      subject: 'FixPhone - Confirmation de réception de votre message',
      text: clientEmailContent,
      html: clientEmailContent.replace(/\n/g, '<br>')
    })

    res.status(200).json({
      success: true,
      message: 'Message envoyé avec succès',
      id: messageId
    })

  } catch (error) {
    console.error('Erreur contact:', error)
    res.status(500).json({
      error: 'Erreur serveur, veuillez réessayer'
    })
  }
})

// Route GET messages (admin)
app.get('/api/messages', async (req, res) => {
  try {
    const messages = await db.all(`
      SELECT * FROM messages
      ORDER BY created_at DESC
    `)
    res.json(messages)
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' })
  }
})

// Route PUT message status (admin)
app.put('/api/messages/:id/status', async (req, res) => {
  try {
    const { status } = req.body
    await db.run(
      'UPDATE messages SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
      [status, req.params.id]
    )
    res.json({ success: true })
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' })
  }
})

// Démarrage serveur
app.listen(PORT, async () => {
  await initDb()
  console.log(`Serveur démarré sur http://localhost:${PORT}`)
})
