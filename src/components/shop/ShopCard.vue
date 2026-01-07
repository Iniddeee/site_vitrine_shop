<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { ShoppingCart, Tag, Clock } from 'lucide-vue-next'
import type { Service } from '@/types/services'
import { useCartStore } from '@/stores/cart'

interface Props {
  service: Service
}

const props = defineProps<Props>()

const cartStore = useCartStore()

const addToCart = () => {
  if (props.service.isShoppable && typeof props.service.price === 'number') {
    cartStore.addToCart(props.service)
  }
}

const formatPrice = (price: number | 'Sur devis') => {
  if (price === 'Sur devis') return price
  return new Intl.NumberFormat('fr-CH', {
    style: 'currency',
    currency: 'CHF',
  }).format(price)
}
</script>

<template>
  <div class="card group hover:shadow-lg transition-all duration-300 relative overflow-hidden">
    <!-- Badge -->
    <div v-if="service.badge" class="absolute top-4 right-4 z-10">
      <span
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

    <!-- Content -->
    <div class="p-6">
      <div class="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-2">
        <Tag class="h-4 w-4" />
        <span>{{ service.category }}</span>
        <span class="mx-1">•</span>
        <Clock class="h-4 w-4" />
        <span>{{ service.duration }}</span>
      </div>

      <h3
        class="text-xl font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors"
      >
        {{ service.title }}
      </h3>

      <p class="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
        {{ service.description }}
      </p>

      <div class="flex items-center justify-between mb-4">
        <span class="text-2xl font-bold text-primary-600 dark:text-primary-400">
          {{ formatPrice(service.price) }}
        </span>
      </div>

      <div class="flex gap-2">
        <button
          v-if="service.isShoppable && typeof service.price === 'number'"
          @click="addToCart"
          class="flex-1 btn-primary flex items-center justify-center px-4 py-2 text-sm"
        >
          <ShoppingCart class="h-4 w-4 mr-2" />
          Ajouter
        </button>

        <RouterLink
          v-else
          to="/contact"
          class="flex-1 btn-secondary flex items-center justify-center px-4 py-2 text-sm inline-block text-center"
        >
          Devis
        </RouterLink>

        <RouterLink :to="`/services/${service.slug}`" class="btn-secondary px-4 py-2 text-sm">
          Détails
        </RouterLink>
      </div>
    </div>
  </div>
</template>
