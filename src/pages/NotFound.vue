<!-- Page 404 - Page non trouvée -->
<script setup lang="ts">
import { RouterLink } from 'vue-router'

defineOptions({
  name: 'NotFoundPage',
})
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4">
    <div class="text-center">
      <h1 class="text-9xl font-bold text-primary-600 dark:text-primary-400">404</h1>
      <h2 class="text-3xl font-semibold text-gray-900 dark:text-white mt-4 mb-4">
        Page non trouvée
      </h2>
      <p class="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
        Désolé, la page que vous cherchez n'existe pas ou a été déplacée.
      </p>
      <RouterLink to="/" class="btn-primary inline-flex items-center px-6 py-3">
        Retour à l'accueil
      </RouterLink>
    </div>
  </div>
</template>
