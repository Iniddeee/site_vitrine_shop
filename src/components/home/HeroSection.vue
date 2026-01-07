<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { ArrowRight, Play, Smartphone, Shield } from 'lucide-vue-next'
</script>

<template>
  <section
    class="relative bg-gradient-to-br from-primary-50 to-white dark:from-gray-900 dark:to-gray-800 py-20 lg:py-32"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center">
        <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white">
          <span class="block">Réparation Expert</span>
          <span class="block text-primary-600 dark:text-primary-400">de Smartphones</span>
        </h1>
        <p class="mt-6 max-w-2xl mx-auto text-xl text-gray-600 dark:text-gray-400">
          Service rapide et professionnel de réparation d'écrans, batteries et plus. Intervention à
          Porrentruy et en Suisse romande.
        </p>
        <div class="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <RouterLink
            to="/services"
            class="btn-primary inline-flex items-center justify-center px-8 py-4 text-lg font-medium"
          >
            Voir nos réparations
            <ArrowRight class="ml-2 h-5 w-5" />
          </RouterLink>
          <RouterLink
            to="/contact"
            class="btn-secondary inline-flex items-center justify-center px-8 py-4 text-lg font-medium"
          >
            <Smartphone class="mr-2 h-5 w-5" />
            Devis gratuit
          </RouterLink>
        </div>

        <!-- Features -->
        <div class="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
          <div class="flex items-center justify-center space-x-2 text-gray-600 dark:text-gray-400">
            <Shield class="h-5 w-5 text-primary-600 dark:text-primary-400" />
            <span>Intervention rapide</span>
          </div>
          <div class="flex items-center justify-center space-x-2 text-gray-600 dark:text-gray-400">
            <Smartphone class="h-5 w-5 text-primary-600 dark:text-primary-400" />
            <span>Pièces certifiées</span>
          </div>
          <div class="flex items-center justify-center space-x-2 text-gray-600 dark:text-gray-400">
            <Play class="h-5 w-5 text-primary-600 dark:text-primary-400" />
            <span>Service rapide</span>
          </div>
        </div>

        <!-- Decorative elements -->
        <div
          class="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary-500 to-transparent"
        ></div>
        <div
          class="absolute -bottom-48 -right-48 h-96 w-96 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 dark:from-primary-600 dark:to-primary-800 blur-3xl opacity-30"
        ></div>
      </div>
    </div>

    <!-- Background decoration -->
    <div class="absolute top-0 right-0 -translate-y-12 translate-x-12 opacity-20">
      <div
        class="h-72 w-72 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 dark:from-primary-600 dark:to-primary-800 blur-3xl"
      ></div>
    </div>
    <div class="absolute bottom-0 left-0 translate-y-12 -translate-x-12 opacity-20">
      <div
        class="h-72 w-72 rounded-full bg-gradient-to-tr from-accent-400 to-accent-600 dark:from-accent-600 dark:to-accent-800 blur-3xl"
      ></div>
    </div>
  </section>
</template>
