// Initialisation de l'application Vue.js
// Configuration principale avec Pinia et Vue Router

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// Import des styles globaux
import './assets/main.css'

// Création de l'instance Vue
const app = createApp(App)

// Enregistrement des plugins
app.use(createPinia())
app.use(router)

// Montage de l'application
app.mount('#app')
