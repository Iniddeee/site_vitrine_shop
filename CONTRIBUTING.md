# Guide pour les développeurs

## 🎯 Objectif du projet

Site web professionnel pour FixPhone Porrentruy - service de réparation de smartphones. Le site permet aux clients de :
- Voir les services disponibles
- Demander des devis
- Contacter l'entreprise
- Naviguer sur un site responsive et moderne

## 🛠️ Stack technique

- **Frontend** : Vue 3 + TypeScript + Composition API
- **Styling** : TailwindCSS
- **State** : Pinia (stores pour panier et favoris)
- **Routing** : Vue Router
- **Build** : Vite
- **Formulaire** : EmailJS (pas de backend)

## 📦 Installation

```bash
# Cloner le projet
git clone <url>
cd site_vitrine_shop

# Installer les dépendances
npm install

# Lancer le développement
npm run dev
```

## 🏗️ Architecture

### Structure des dossiers

```
src/
├── components/
│   ├── common/          # Header, Footer (composants globaux)
│   ├── home/           # Page d'accueil
│   ├── services/       # Services et cartes
│   ├── shop/           # Boutique, panier
│   └── ui/             # Composants UI réutilisables
├── pages/              # Routes principales
├── stores/             # Pinia stores
├── composables/        # Logique réutilisable
├── data/               # Données statiques (JSON)
├── types/              # Types TypeScript
└── assets/             # Images, icônes
```

### Composants clés

- **ServiceCard** : Carte pour afficher un service
- **ShopCard** : Carte pour la boutique (avec prix)
- **Header** : Navigation principale + panier/favoris
- **Footer** : Pied de page avec liens

### Stores Pinia

- **useCartStore** : Gestion du panier d'achat
- **useFavoritesStore** : Gestion des favoris

## 📧 Formulaire de contact

Le formulaire utilise **EmailJS** (pas de backend nécessaire) :

### Configuration

1. Créer un compte EmailJS
2. Créer un service Gmail
3. Créer un template avec les variables :
   - `{{name}}`, `{{email}}`, `{{phone}}`
   - `{{subject}}`, `{{device}}`, `{{issue}}`
   - `{{message}}`

4. Mettre à jour les clés dans `src/pages/Contact.vue`

### Variables d'environnement

Pour la production, les clés EmailJS peuvent être mises dans `.env.production` :
```
VITE_EMAILJS_PUBLIC_KEY=xxx
VITE_EMAILJS_SERVICE_ID=xxx
VITE_EMAILJS_TEMPLATE_ID=xxx
```

## 🎨 Style et Thème

### Couleurs principales
- Primary : Blue (modifiable dans `tailwind.config.js`)
- Dark mode supporté

### Composants UI
- Toast pour les notifications
- Boutons avec classes `.btn-primary`, `.btn-secondary`
- Cards avec classe `.card`

## 📝 Ajouter un service

1. Éditer `src/data/services.json`
2. Ajouter un objet avec les champs :
   ```json
   {
     "id": "unique-id",
     "title": "Nom du service",
     "description": "Description",
     "price": 100 ou "Sur devis",
     "duration": "30 min",
     "category": "Catégorie",
     "image": "/image.jpg",
     "badge": "Populaire" (optionnel)
   }
   ```

## 🚀 Déploiement

### Vercel (recommandé)
- Connecter le repo GitHub
- Vercel détecte automatiquement Vue.js
- Variables d'environnement à configurer dans Vercel

### Autres hébergeurs statiques
1. `npm run build`
2. Uploader le dossier `dist/`
3. Configurer le routing SPA

## 🔧 Commandes utiles

```bash
npm run dev        # Développement
npm run build      # Production
npm run preview    # Preview du build
npm run lint       # Linter
npm run format     # Formatter
```

## 🐛 Debug

### Problèmes courants
- **Formulaire ne marche pas** : Vérifier les clés EmailJS et le template
- **Routing 404** : Configurer le serveur pour le SPA routing
- **Styles ne chargent pas** : Vérifier le build Tailwind

### Outils
- Vue DevTools pour le debugging
- Console pour les erreurs EmailJS

## 📋 Checklist avant de modifier

1. Lire la documentation du composant
2. Créer une branche feature
3. Tester sur mobile et desktop
4. Vérifier le dark mode
5. Tester le formulaire si modification

## 🤝 Contribuer

1. Fork le projet
2. Créer une branche : `git checkout -b feature/nouvelle-fonction`
3. Commit : `git commit -m 'Ajout: nouvelle fonctionnalité'`
4. Push : `git push origin feature/nouvelle-fonction`
5. Pull Request

## 📞 Support

Pour toute question sur le projet :
- Lire ce guide
- Vérifier les composants existants
- Regarder les stores Pinia
- Consulter la documentation Vue 3 et Tailwind
