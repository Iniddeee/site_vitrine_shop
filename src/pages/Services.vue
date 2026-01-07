<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import ServiceCard from '@/components/services/ServiceCard.vue'
import ServiceFilters from '@/components/services/ServiceFilters.vue'
import servicesData from '@/data/services.json'
import type { Service } from '@/types/services'

defineOptions({
  name: 'ServicesPage',
})

const services = ref<Service[]>([])
const categories = ref<string[]>([])
const filteredServices = ref<Service[]>([])

const filters = ref({
  category: 'all',
  sortBy: 'popular',
})

onMounted(() => {
  services.value = servicesData as Service[]
  categories.value = [...new Set(services.value.map((s) => s.category))]
  applyFilters()
})

watch(
  filters,
  () => {
    applyFilters()
  },
  { deep: true },
)

const applyFilters = () => {
  let result = [...services.value]

  // Filter by category
  if (filters.value.category !== 'all') {
    result = result.filter((s) => s.category === filters.value.category)
  }

  // Sort
  switch (filters.value.sortBy) {
    case 'price-low':
      result.sort((a, b) => {
        const priceA = typeof a.price === 'number' ? a.price : Infinity
        const priceB = typeof b.price === 'number' ? b.price : Infinity
        return priceA - priceB
      })
      break
    case 'price-high':
      result.sort((a, b) => {
        const priceA = typeof a.price === 'number' ? a.price : -Infinity
        const priceB = typeof b.price === 'number' ? b.price : -Infinity
        return priceB - priceA
      })
      break
    case 'popular':
    default:
      // Keep original order or sort by badge priority
      result.sort((a, b) => {
        const getBadgePriority = (badge: string | null) => {
          if (badge === 'Populaire') return 0
          if (badge === 'Premium') return 1
          if (badge === 'Nouveau') return 2
          if (badge === 'Promo') return 3
          return 4
        }
        return getBadgePriority(a.badge) - getBadgePriority(b.badge)
      })
  }

  filteredServices.value = result
}

const handleFilter = (newFilters: { category: string; sortBy: string }) => {
  filters.value = newFilters
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Hero Section -->
      <section
        class="bg-gradient-to-br from-primary-50 to-white dark:from-gray-900 dark:to-gray-800 py-16"
      >
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center">
            <h1 class="text-4xl font-bold text-gray-900 dark:text-white">Nos Services</h1>
            <p class="mt-4 max-w-2xl mx-auto text-xl text-gray-600 dark:text-gray-400">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
        </div>
      </section>

      <!-- Header -->
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold text-gray-900 dark:text-white">Toutes Nos Prestations</h2>
        <p class="mt-4 text-lg text-gray-600 dark:text-gray-400">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore.
        </p>
      </div>

      <!-- Filters -->
      <ServiceFilters :categories="categories" @filter="handleFilter" />

      <!-- Results count -->
      <div class="mb-6">
        <p class="text-gray-600 dark:text-gray-400">
          {{ filteredServices.length }} service{{ filteredServices.length > 1 ? 's' : '' }} trouvé{{
            filteredServices.length > 1 ? 's' : ''
          }}
        </p>
      </div>

      <!-- Services Grid -->
      <div
        v-if="filteredServices.length > 0"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <ServiceCard v-for="service in filteredServices" :key="service.id" :service="service" />
      </div>

      <!-- Empty state -->
      <div v-else class="text-center py-12">
        <p class="text-gray-500 dark:text-gray-400">Aucun service ne correspond à vos critères.</p>
      </div>
    </div>
  </div>
</template>
