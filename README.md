# FixPhone Porrentruy

Site web professionnel pour FixPhone, service de réparation de smartphones à Porrentruy, Suisse.

## � Sommaire

- [�🚀 Démarrage rapide](#-démarrage-rapide)
- [📧 Configuration EmailJS](#-configuration-du-formulaire-de-contact)
- [🎨 Fonctionnalités](#-fonctionnalités)
- [📁 Structure](#-structure)
- [🌐 Déploiement](#-déploiement)
- [📚 Documentation](#-documentation)

## 🚀 Démarrage rapide

### Prérequis
- Node.js 20+
- npm ou yarn

### Installation
```bash
# Cloner le projet
git clone https://github.com/Iniddeee/site_vitrine_shop.git
cd site_vitrine_shop

# Installer les dépendances
npm install

# Lancer le développement
npm run dev
```

### Build pour production
```bash
npm run build
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

- ✅ Design responsive avec TailwindCSS
- ✅ Système de panier (Shop)
- ✅ Favoris avec persistance
- ✅ Formulaire de contact fonctionnel (EmailJS)
- ✅ Dark mode
- ✅ Animations AOS au scroll
- ✅ TypeScript
- ✅ SEO optimisé

## 📁 Structure

```
src/
├── components/     # Composants Vue
│   ├── common/    # Header, Footer
│   ├── home/      # Page d'accueil
│   ├── services/  # Services et filtres
│   ├── shop/      # Boutique et panier
│   └── ui/        # Composants UI (Toast, etc.)
├── pages/         # Pages du site
├── stores/        # Pinia stores (favoris, panier)
├── composables/   # Logique réutilisable
├── data/          # Données statiques
├── types/         # Types TypeScript
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

## � Documentation

- [CONTRIBUTING.md](./CONTRIBUTING.md) - Guide pour les développeurs
- [ARCHITECTURE.md](./ARCHITECTURE.md) - Architecture détaillée
- [CHANGELOG.md](./CHANGELOG.md) - Historique des modifications
- [TODO.md](./TODO.md) - Roadmap et améliorations

## 🤝 Contribuer

Les contributions sont les bienvenues ! Voir [CONTRIBUTING.md](./CONTRIBUTING.md) pour les détails.

## �📄 Licence

Développé par Zakaria Eddini - MIT License
