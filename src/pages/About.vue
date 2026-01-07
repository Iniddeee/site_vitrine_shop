<script setup lang="ts">
import { RouterLink } from 'vue-router'

defineOptions({
  name: 'AboutPage',
})
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Hero Section -->
    <section
      class="bg-gradient-to-br from-primary-50 to-white dark:from-gray-900 dark:to-gray-800 py-16"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h1 class="text-4xl font-bold text-gray-900 dark:text-white">À Propos</h1>
          <p class="mt-4 max-w-2xl mx-auto text-xl text-gray-600 dark:text-gray-400">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
      </div>
    </section>

    <!-- Story Section -->
    <section class="py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-6">Notre Histoire</h2>
            <p class="text-lg text-gray-600 dark:text-gray-400 mb-6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <p class="text-lg text-gray-600 dark:text-gray-400 mb-6">
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
              officia deserunt mollit anim id est laborum.
            </p>
            <p class="text-lg text-gray-600 dark:text-gray-400">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
              laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi
              architecto beatae vitae dicta sunt explicabo.
            </p>
          </div>
          <div
            class="bg-gray-200 dark:bg-gray-700 rounded-lg h-96 flex items-center justify-center"
          >
            <span class="text-gray-500 dark:text-gray-400">Image placeholder</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Mission & Values -->
    <section class="py-16 bg-white dark:bg-gray-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Notre Mission & Nos Valeurs
          </h2>
          <p class="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="text-center">
            <div
              class="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <span class="text-primary-600 dark:text-primary-400 text-2xl font-bold">01</span>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">Excellence</h3>
            <p class="text-gray-600 dark:text-gray-400">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore.
            </p>
          </div>

          <div class="text-center">
            <div
              class="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <span class="text-primary-600 dark:text-primary-400 text-2xl font-bold">02</span>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">Innovation</h3>
            <p class="text-gray-600 dark:text-gray-400">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
              laudantium.
            </p>
          </div>

          <div class="text-center">
            <div
              class="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <span class="text-primary-600 dark:text-primary-400 text-2xl font-bold">03</span>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">Engagement</h3>
            <p class="text-gray-600 dark:text-gray-400">
              At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium
              voluptatum.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Team Section -->
    <section class="py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">Notre Équipe</h2>
          <p class="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="text-center">
            <div
              class="bg-gray-200 dark:bg-gray-700 rounded-full w-32 h-32 mx-auto mb-4 flex items-center justify-center"
            >
              <span class="text-gray-500 dark:text-gray-400">Photo</span>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-1">Nom Prénom</h3>
            <p class="text-primary-600 dark:text-primary-400 mb-2">Poste</p>
            <p class="text-gray-600 dark:text-gray-400">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod.
            </p>
          </div>

          <div class="text-center">
            <div
              class="bg-gray-200 dark:bg-gray-700 rounded-full w-32 h-32 mx-auto mb-4 flex items-center justify-center"
            >
              <span class="text-gray-500 dark:text-gray-400">Photo</span>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-1">Nom Prénom</h3>
            <p class="text-primary-600 dark:text-primary-400 mb-2">Poste</p>
            <p class="text-gray-600 dark:text-gray-400">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium.
            </p>
          </div>

          <div class="text-center">
            <div
              class="bg-gray-200 dark:bg-gray-700 rounded-full w-32 h-32 mx-auto mb-4 flex items-center justify-center"
            >
              <span class="text-gray-500 dark:text-gray-400">Photo</span>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-1">Nom Prénom</h3>
            <p class="text-primary-600 dark:text-primary-400 mb-2">Poste</p>
            <p class="text-gray-600 dark:text-gray-400">
              At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis.
            </p>
          </div>
        </div>
      </div>
    </section>
    <!-- CTA Section -->
    <section class="py-16 bg-primary-50 dark:bg-gray-800">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Rejoignez Notre Aventure
        </h2>
        <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.
        </p>
        <RouterLink
          to="/contact"
          class="btn-primary inline-flex items-center px-8 py-3 text-lg font-medium"
        >
          Contactez-nous
        </RouterLink>
      </div>
    </section>
  </div>
</template>
