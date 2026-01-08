# Architecture du projet

## 🏛️ Vue d'ensemble

Le projet suit une architecture standard Vue 3 avec une séparation claire des responsabilités.

## 📂 Structure détaillée

```
src/
├── assets/                    # Assets statiques
│   ├── main.css              # Styles globaux
│   └── images/               # Images du site
├── components/                # Composants Vue
│   ├── common/               # Composants globaux
│   │   ├── Header.vue        # Navigation + recherche
│   │   └── Footer.vue        # Pied de page
│   ├── home/                 # Page d'accueil
│   │   ├── HeroSection.vue   # Bannière principale
│   │   ├── ServicesPreview.vue # Aperçu services
│   │   └── Testimonials.vue  # Témoignages
│   ├── services/             # Module services
│   │   ├── ServiceCard.vue   # Carte service
│   │   └── ServiceFilters.vue # Filtres services
│   ├── shop/                 # Module boutique
│   │   ├── ShopCard.vue      # Carte produit
│   │   ├── CartDrawer.vue    # Panier latéral
│   │   └── CartItem.vue      # Item du panier
│   └── ui/                   # Composants UI
│       ├── Toast.vue         # Notification
│       └── ToastContainer.vue # Conteneur toasts
├── composables/              # Logique réutilisable
│   ├── useAOS.ts            # Animations au scroll
│   ├── useToast.ts          # Gestion toasts
│   └── useCart.ts           # Logique panier
├── data/                     # Données statiques
│   ├── services.json        # Liste des services
│   └── testimonials.json    # Témoignages
├── pages/                    # Pages / Routes
│   ├── Home.vue             # Accueil
│   ├── Services.vue         # Liste services
│   ├── ServiceDetail.vue    # Détail service
│   ├── Shop.vue             # Boutique
│   ├── Cart.vue             # Page panier
│   ├── Favorites.vue        # Favoris
│   ├── About.vue            # À propos
│   ├── Contact.vue          # Contact (EmailJS)
│   └── NotFound.vue         # 404
├── router/                   # Configuration router
│   └── index.ts             # Routes Vue Router
├── stores/                   # State management
│   ├── cart.ts              # Store panier
│   └── favorites.ts         # Store favoris
├── types/                    # Types TypeScript
│   └── services.ts          # Types pour services
└── main.ts                   # Point d'entrée
```

## 🔄 Flux de données

### 1. Navigation
- `Header.vue` gère la navigation active
- Vue Router contrôle les routes
- Protection des routes si nécessaire

### 2. Services
- Données depuis `data/services.json`
- Filtrage dans `Services.vue`
- Affichage dans `ServiceCard.vue`

### 3. Boutique / Panier
- `ShopCard.vue` ajoute au panier
- `useCartStore` gère l'état
- `CartDrawer.vue` affiche le panier
- Persistance localStorage

### 4. Formulaire Contact
- `Contact.vue` collecte les données
- EmailJS envoie les emails
- Pas de backend nécessaire

## 🎨 Pattern utilisés

### Composition API
Tous les composants utilisent `<script setup>` pour une syntaxe concise.

### Props et Emits
```typescript
interface Props {
  service: Service
}

defineEmits<{
  add: [service: Service]
}>()
```

### Composables
Logique extraite dans `composables/` pour la réutilisabilité.

### Stores Pinia
Gestion centralisée de l'état avec persistance.

## 🔧 Configuration

### TailwindCSS
- Configuré dans `tailwind.config.js`
- Personnalisable pour les couleurs

### Vite
- Build rapide avec HMR
- Optimisation automatique

### TypeScript
- Types forts dans `types/`
- Configuration dans `tsconfig.*.json`

## 📱 Responsive Design

Le design suit la philosophie **Mobile First** :
- Base : Mobile (320px+)
- md : Tablettes (768px+)
- lg : Desktop (1024px+)
- xl : Large screens (1280px+)

## 🌍 Internationalisation

Pour l'instant en français uniquement. Pour i18n :
1. Installer `vue-i18n`
2. Créer des fichiers de traduction
3. Wrapper l'app avec `<I18n>`

## 🔒 Sécurité

- Pas de données sensibles côté client
- Clés EmailJS dans variables d'environnement
- Validation des formulaires côté client

## 🧪 Tests

Structure prête pour les tests :
- Vitest configuré
- Dossier `tests/` à créer
- Tests unitaires et E2C possibles
