<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { Clock, Tag } from 'lucide-vue-next'
import type { Service } from '@/types/services'

interface Props {
  service: Service
}

defineOptions({
  name: 'ServiceCard',
})

defineProps<Props>()

const formatPrice = (price: number | 'Sur devis') => {
  if (price === 'Sur devis') return price
  return new Intl.NumberFormat('fr-CH', {
    style: 'currency',
    currency: 'CHF',
  }).format(price)
}
</script>

<template>
  <div
    class="card group hover:shadow-xl transition-all duration-300 relative overflow-hidden flex flex-col h-full"
  >
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
    <div class="flex flex-col h-full">
      <!-- Meta info -->
      <div class="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400 mb-3">
        <div class="flex items-center gap-1">
          <Tag class="h-4 w-4" />
          <span>{{ service.category }}</span>
        </div>
        <span class="text-gray-300 dark:text-gray-600">•</span>
        <div class="flex items-center gap-1">
          <Clock class="h-4 w-4" />
          <span>{{ service.duration }}</span>
        </div>
      </div>

      <!-- Title -->
      <h3
        class="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors min-h-[3.5rem]"
      >
        {{ service.title }}
      </h3>

      <!-- Description -->
      <p class="text-gray-600 dark:text-gray-300 mb-6 line-clamp-2 flex-grow">
        {{ service.description }}
      </p>

      <!-- Price and CTA -->
      <div
        class="flex items-center justify-between mt-auto pt-4 border-t border-gray-200 dark:border-gray-600"
      >
        <div class="flex flex-col">
          <span class="text-sm text-gray-500 dark:text-gray-400 mb-1">Prix</span>
          <span class="text-2xl font-bold text-primary-600 dark:text-primary-400">
            {{ formatPrice(service.price) }}
          </span>
        </div>
        <RouterLink
          :to="`/services/${service.slug}`"
          class="btn-primary px-6 py-3 text-sm whitespace-nowrap"
        >
          Voir plus
        </RouterLink>
      </div>
    </div>
  </div>
</template>
