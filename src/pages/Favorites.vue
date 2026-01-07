<script setup lang="ts">
import { ref } from 'vue'
import { Heart } from 'lucide-vue-next'

defineOptions({
  name: 'FavoritesPage',
})
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center">
        <Heart class="h-16 w-16 text-primary-600 dark:text-primary-400 mx-auto mb-6" />
        <h1 class="text-4xl font-bold text-gray-900 dark:text-white">Favoris</h1>
        <p class="mt-4 text-lg text-gray-600 dark:text-gray-400">Vos services favoris</p>
      </div>
    </div>
  </div>
</template>
