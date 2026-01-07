# FixPhone Porrentruy 📱

Site web vitrine pour FixPhone, votre réparateur de smartphones de confiance à Porrentruy !

## 🚀 Pour démarrer

Prérequis : Node.js 20+ (j'utilise la 20.19.0)

```bash
# Cloner le repo
git clone <url>
cd site-vitrine-services

# Installer les dépendances
npm install

# Lancer le serveur de dev
npm run dev
```

Le site sera accessible sur `http://localhost:5173`

## 📝 J'ai utilisé quoi ?

- **Vue 3** avec Composition API (c'est trop bien !)
- **TypeScript** pour éviter les conneries
- **Tailwind CSS** pour le style (plus besoin de galérer avec le CSS)
- **Pinia** pour le store (simple et efficace)
- **Vue Router** pour la navigation
- **Vite** pour le build (rapidité impressionnante !)

## Démarrage rapide

### Option 1: Double-cliquer sur le script

- Windows: Double-cliquez sur `start.bat` ou `start.ps1`

### Option 2: Ligne de commande

```bash
# Installer les dépendances (une seule fois)
npm install

# Lancer le site en mode développement
npm run dev
```

Le site sera accessible à l'adresse: **http://localhost:5174**

## Structure du projet

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
├── data/          # Données mock
└── assets/        # Images et styles
```

## Pages disponibles

- **Accueil** (`/`) - Hero section, services preview, témoignages
- **Services** (`/services`) - Liste des services avec filtres
- **Détail service** (`/services/:slug`) - Page détaillée d'un service
- **Boutique** (`/shop`) - Services achetables
- **Panier** (`/cart`) - Gestion du panier
- **Favoris** (`/favorites`) - Services sauvegardés
- **À propos** (`/about`) - Présentation de l'entreprise
- **Contact** (`/contact`) - Formulaire de contact

## Commandes utiles

```bash
# Développement avec hot-reload
npm run dev

# Build pour production
npm run build

# Preview du build de production
npm run preview

# Linter le code
npm run lint

# Formatter le code
npm run format
```

## Configuration requise

- Node.js 20.19.0 ou supérieur
- npm 10.0.0 ou supérieur

## Développement

Le projet utilise Vue 3 avec TypeScript et le pattern Composition API. Les styles sont gérés avec Tailwind CSS et le state management avec Pinia.

---
