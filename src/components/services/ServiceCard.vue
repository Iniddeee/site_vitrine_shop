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
  <div class="group relative">
    <!-- Badge -->
    <div v-if="service.badge" class="absolute -top-2 -right-2 z-10">
      <span
        class="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg"
        :class="{
          'bg-red-500 text-white': service.badge === 'Populaire',
          'bg-green-500 text-white': service.badge === 'Nouveau',
          'bg-purple-500 text-white': service.badge === 'Premium',
          'bg-orange-500 text-white': service.badge === 'Promo',
        }"
      >
        {{ service.badge }}
      </span>
    </div>

    <!-- Card -->
    <div
      class="card group-hover:shadow-2xl group-hover:scale-[1.02] transition-all duration-300 h-full flex flex-col"
    >
      <!-- Header -->
      <div
        class="flex items-center justify-between mb-4 pb-4 border-b border-gray-200 dark:border-gray-600"
      >
        <div class="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
          <Tag class="h-4 w-4" />
          <span class="font-medium">{{ service.category }}</span>
        </div>
        <div
          class="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-600 px-3 py-1.5 rounded-full"
        >
          <Clock class="h-4 w-4" />
          <span class="font-medium">{{ service.duration }}</span>
        </div>
      </div>

      <!-- Title -->
      <h3
        class="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors leading-tight min-h-[3.5rem]"
      >
        {{ service.title }}
      </h3>

      <!-- Description -->
      <p class="text-gray-600 dark:text-gray-300 mb-6 line-clamp-2 flex-grow leading-relaxed">
        {{ service.description }}
      </p>

      <!-- Footer -->
      <div class="mt-auto pt-6 border-t border-gray-200 dark:border-gray-600">
        <div class="flex items-center justify-between gap-4">
          <div>
            <p
              class="text-xs text-gray-500 dark:text-gray-400 mb-1 font-medium uppercase tracking-wide"
            >
              Prix
            </p>
            <p class="text-3xl font-bold text-primary-600 dark:text-primary-400">
              {{ formatPrice(service.price) }}
            </p>
          </div>
          <RouterLink
            :to="`/services/${service.slug}`"
            class="btn-primary px-6 py-3 text-sm font-semibold whitespace-nowrap shadow-lg hover:shadow-xl transition-shadow flex-shrink-0"
          >
            Voir plus
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>
