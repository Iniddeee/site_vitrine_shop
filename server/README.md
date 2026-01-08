# Serveur API FixPhone

Backend Node.js pour la gestion des messages de contact.

## Installation

```bash
cd server
npm install
```

## Configuration

1. Copiez `.env` et configurez vos identifiants email
2. Pour Gmail, créez un "App Password" : 
   - Activer 2FA sur votre compte
   - Aller dans [App Passwords](https://myaccount.google.com/apppasswords)
   - Générer un mot de passe pour "Mail"

## Démarrage

Développement :
```bash
npm run dev
```

Production :
```bash
npm start
```

## API Endpoints

### POST /api/contact
Envoie un message de contact

### GET /api/messages
Récupère tous les messages (admin)

### PUT /api/messages/:id/status
Met à jour le statut d'un message (admin)

## Sécurité

- Rate limiting : 5 messages par IP toutes les 15 minutes
- Validation Joi des données
- Helmet pour headers sécurité
- CORS configuré

## Base de données

SQLite avec table `messages` auto-créée au démarrage.
