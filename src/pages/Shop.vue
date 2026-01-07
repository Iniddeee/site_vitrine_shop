<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { Wrench, Clock, CheckCircle } from 'lucide-vue-next'
import servicesData from '@/data/services.json'
import type { Service } from '@/types/services'

defineOptions({
  name: 'DevisPage',
})

// Services populaires pour le devis
const popularServices = ref<Service[]>([
  ...(servicesData as Service[]).filter((s) => s.badge === 'Populaire').slice(0, 4),
])

const formatPrice = (price: number | 'Sur devis') => {
  if (price === 'Sur devis') return price
  return new Intl.NumberFormat('fr-CH', {
    style: 'currency',
    currency: 'CHF',
  }).format(price)
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Devis Gratuit et Rapide
        </h1>
        <p class="text-xl text-gray-600 dark:text-gray-400">
          Obtenez un devis personnalisé pour votre réparation en moins de 24h
        </p>
      </div>

      <!-- Quick Quote Form -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8 mb-8">
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
          Quel appareil réparer ?
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Type d'appareil
            </label>
            <select
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600"
            >
              <option>iPhone</option>
              <option>Samsung</option>
              <option>iPad</option>
              <option>Autre</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Type de réparation
            </label>
            <select
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600"
            >
              <option>Écran cassé</option>
              <option>Batterie défectueuse</option>
              <option>Problème de charge</option>
              <option>Autre</option>
            </select>
          </div>
        </div>

        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Description du problème (optionnel)
          </label>
          <textarea
            rows="4"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600"
            placeholder="Décrivez le problème que vous rencontrez..."
          ></textarea>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Votre nom
            </label>
            <input
              type="text"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600"
              placeholder="Jean Dupont"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Votre téléphone
            </label>
            <input
              type="tel"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600"
              placeholder="079 123 45 67"
            />
          </div>
        </div>

        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Votre email
          </label>
          <input
            type="email"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600"
            placeholder="jean.dupont@email.ch"
          />
        </div>

        <RouterLink
          to="/contact?type=devis"
          class="w-full btn-primary text-lg py-4 block text-center"
        >
          Envoyer ma demande de devis
        </RouterLink>
      </div>

      <!-- Popular Services -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8">
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
          Réparations les plus demandées
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            v-for="service in popularServices"
            :key="service.id"
            class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <h3 class="font-semibold text-gray-900 dark:text-white mb-2">
              {{ service.title }}
            </h3>
            <p class="text-gray-600 dark:text-gray-400 text-sm mb-3">
              {{ service.description }}
            </p>
            <div class="flex justify-between items-center">
              <span class="text-primary-600 font-semibold">
                {{ formatPrice(service.price) }}
              </span>
              <RouterLink
                :to="`/contact?type=devis&service=${service.title}`"
                class="text-primary-600 hover:text-primary-700 text-sm font-medium"
              >
                Choisir
              </RouterLink>
            </div>
          </div>
        </div>
      </div>

      <!-- Why Choose Us -->
      <div class="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="text-center">
          <div
            class="bg-primary-100 dark:bg-primary-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <Clock class="h-8 w-8 text-primary-600 dark:text-primary-400" />
          </div>
          <h3 class="font-semibold text-gray-900 dark:text-white mb-2">Réponse sous 24h</h3>
          <p class="text-gray-600 dark:text-gray-400 text-sm">
            Devis personnalisé envoyé par email dans la journée
          </p>
        </div>

        <div class="text-center">
          <div
            class="bg-primary-100 dark:bg-primary-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <CheckCircle class="h-8 w-8 text-primary-600 dark:text-primary-400" />
          </div>
          <h3 class="font-semibold text-gray-900 dark:text-white mb-2">Tarifs transparents</h3>
          <p class="text-gray-600 dark:text-gray-400 text-sm">
            Pas de frais cachés, prix fixe garanti
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
