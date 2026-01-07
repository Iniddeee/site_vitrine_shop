<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { ArrowLeft, Clock, ShoppingCart, Mail } from 'lucide-vue-next'
import servicesData from '@/data/services.json'
import type { Service } from '@/types/services'
import { useCartStore } from '@/stores/cart'

const route = useRoute()
const cartStore = useCartStore()

const service = ref<Service | null>(null)
const isLoading = ref(true)

onMounted(() => {
  const slug = route.params.slug as string
  const found = (servicesData as Service[]).find((s) => s.slug === slug)

  if (found) {
    service.value = found
  }
  isLoading.value = false
})

const addToCart = () => {
  if (service.value && service.value.isShoppable) {
    cartStore.addToCart(service.value)
  }
}

const formatPrice = (price: number | 'Sur devis') => {
  if (price === 'Sur devis') return price
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
  }).format(price)
}
</script>

<template>
  <div v-if="!isLoading && service" class="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Breadcrumb -->
      <nav class="mb-8">
        <RouterLink
          to="/services"
          class="inline-flex items-center text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400"
        >
          <ArrowLeft class="h-4 w-4 mr-2" />
          Retour aux services
        </RouterLink>
      </nav>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Main Content -->
        <div class="lg:col-span-2">
          <!-- Header -->
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6">
            <div class="flex items-start justify-between mb-4">
              <div class="flex-1">
                <div class="flex items-center gap-3 mb-3">
                  <span
                    class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200"
                  >
                    {{ service.category }}
                  </span>
                  <span
                    v-if="service.badge"
                    class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium"
                    :class="{
                      'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200':
                        service.badge === 'Populaire',
                      'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200':
                        service.badge === 'Nouveau',
                      'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200':
                        service.badge === 'Premium',
                      'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200':
                        service.badge === 'Promo',
                    }"
                  >
                    {{ service.badge }}
                  </span>
                </div>
                <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  {{ service.title }}
                </h1>
                <div class="flex items-center gap-4 text-gray-600 dark:text-gray-400">
                  <div class="flex items-center">
                    <Clock class="h-4 w-4 mr-1" />
                    <span>{{ service.duration }}</span>
                  </div>
                </div>
              </div>
            </div>

            <p class="text-lg text-gray-600 dark:text-gray-400">
              {{ service.description }}
            </p>
          </div>

          <!-- Description -->
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Description détaillée
            </h2>
            <div class="prose prose-gray dark:prose-invert max-w-none">
              <p>{{ service.longDescription }}</p>
            </div>
          </div>

          <!-- Features -->
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Ce qui est inclus
            </h2>
            <ul class="space-y-3">
              <li
                v-for="feature in service.features"
                :key="feature"
                class="flex items-center text-gray-600 dark:text-gray-400"
              >
                <svg class="h-5 w-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clip-rule="evenodd"
                  />
                </svg>
                {{ feature }}
              </li>
            </ul>
          </div>
        </div>

        <!-- Sidebar -->
        <div class="lg:col-span-1">
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 sticky top-24">
            <div class="text-center mb-6">
              <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">Prix</p>
              <p class="text-4xl font-bold text-primary-600 dark:text-primary-400">
                {{ formatPrice(service.price) }}
              </p>
            </div>

            <div class="space-y-3">
              <button
                v-if="service.isShoppable && typeof service.price === 'number'"
                @click="addToCart"
                class="w-full btn-primary flex items-center justify-center"
              >
                <ShoppingCart class="h-5 w-5 mr-2" />
                Ajouter au panier
              </button>

              <RouterLink
                v-else
                to="/contact"
                class="w-full btn-secondary flex items-center justify-center inline-block text-center"
              >
                <Mail class="h-5 w-5 mr-2" />
                Demander un devis
              </RouterLink>

              <RouterLink
                to="/contact"
                class="w-full btn-secondary flex items-center justify-center inline-block text-center"
              >
                Nous contacter
              </RouterLink>
            </div>

            <div class="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <p class="text-sm text-gray-600 dark:text-gray-400 text-center">
                Paiement sécurisé<br />
                Service professionnel<br />
                Support 24/7
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div v-else-if="isLoading" class="min-h-screen flex items-center justify-center">
    <div class="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
  </div>

  <div v-else class="min-h-screen flex items-center justify-center">
    <div class="text-center">
      <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">Service non trouvé</h1>
      <RouterLink to="/services" class="btn-primary"> Voir tous les services </RouterLink>
    </div>
  </div>
</template>
