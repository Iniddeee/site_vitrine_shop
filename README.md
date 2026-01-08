# FixPhone Porrentruy

Site web professionnel pour FixPhone, service de réparation de smartphones à Porrentruy, Suisse.

## 🚀 Démarrage rapide

### Prérequis
- Node.js 20+
- npm ou yarn

### Installation
```bash
npm install
```

### Développement
```bash
npm run dev
```

### Build pour production
```bash
npm run build
```

### Preview
```bash
npm run preview
```

## 📧 Configuration du formulaire de contact

Le formulaire utilise EmailJS pour envoyer les emails directement.

1. Crée un compte sur [EmailJS](https://www.emailjs.com/)
2. Configure un service Gmail
3. Crée un template avec les variables : `{{name}}`, `{{email}}`, `{{phone}}`, `{{subject}}`, `{{device}}`, `{{issue}}`, `{{message}}`
4. Met à jour les clés dans `src/pages/Contact.vue` :
   - `EMAILJS_PUBLIC_KEY`
   - `EMAILJS_SERVICE_ID`
   - `EMAILJS_TEMPLATE_ID`

## 🎨 Fonctionnalités

- Design responsive avec TailwindCSS
- Système de panier (Shop)
- Favoris
- Formulaire de contact fonctionnel
- Dark mode
- Animations avec AOS
- TypeScript

## 📁 Structure

```
src/
├── components/     # Composants Vue
├── pages/         # Pages du site
├── data/          # Données statiques
├── composables/   # Composables Vue
└── assets/        # Assets statiques
```

## 🌐 Déploiement

### Vercel (recommandé)
1. Connecte le repo GitHub à Vercel
2. Vercel détecte automatiquement Vue.js
3. Déploiement automatique

### Autres hébergeurs
1. `npm run build`
2. Upload du dossier `dist/`
3. Configure le serveur pour le SPA routing

## 📄 Licence

Développé par Zakaria Eddini
