<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { Filter, X } from 'lucide-vue-next'

interface Props {
  categories: string[]
}

const props = defineProps<Props>()

const emit = defineEmits<{
  filter: [{ category: string; sortBy: string }]
}>()

const selectedCategory = ref('all')
const sortBy = ref('popular')

const categoriesWithAll = computed(() => [
  { value: 'all', label: 'Toutes les catégories' },
  ...props.categories.map((cat) => ({ value: cat, label: cat })),
])

const sortOptions = [
  { value: 'popular', label: 'Populaire' },
  { value: 'price-low', label: 'Prix croissant' },
  { value: 'price-high', label: 'Prix décroissant' },
]

watch([selectedCategory, sortBy], () => {
  emit('filter', {
    category: selectedCategory.value,
    sortBy: sortBy.value,
  })
})

const clearFilters = () => {
  selectedCategory.value = 'all'
  sortBy.value = 'popular'
}
</script>

<template>
  <div
    class="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600 mb-8"
  >
    <div class="flex items-center justify-between mb-4">
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
        <Filter class="h-5 w-5 mr-2" />
        Filtres
      </h3>
      <button
        v-if="selectedCategory !== 'all' || sortBy !== 'popular'"
        @click="clearFilters"
        class="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 flex items-center"
      >
        <X class="h-4 w-4 mr-1" />
        Effacer
      </button>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <!-- Category Filter -->
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Catégorie
        </label>
        <select
          v-model="selectedCategory"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
        >
          <option
            v-for="category in categoriesWithAll"
            :key="category.value"
            :value="category.value"
          >
            {{ category.label }}
          </option>
        </select>
      </div>

      <!-- Sort By -->
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Trier par
        </label>
        <select
          v-model="sortBy"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
        >
          <option v-for="option in sortOptions" :key="option.value" :value="option.value">
            {{ option.label }}
          </option>
        </select>
      </div>
    </div>
  </div>
</template>
