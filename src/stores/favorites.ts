import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Service } from '@/types/services'
import { useToast } from '@/composables/useToast'

export const useFavoritesStore = defineStore('favorites', () => {
  const favorites = ref<Service[]>([])
  const toast = useToast()

  // Load favorites from localStorage
  const loadFavorites = () => {
    const stored = localStorage.getItem('favorites')
    if (stored) {
      favorites.value = JSON.parse(stored)
    }
  }

  // Save favorites to localStorage
  const saveFavorites = () => {
    localStorage.setItem('favorites', JSON.stringify(favorites.value))
  }

  // Initialize on store creation
  loadFavorites()

  // Add to favorites
  const addFavorite = (service: Service) => {
    if (!isFavorite(service.id)) {
      favorites.value.push(service)
      saveFavorites()
      toast.success(`${service.title} ajouté aux favoris`)
    }
  }

  // Remove from favorites
  const removeFavorite = (serviceId: number) => {
    const index = favorites.value.findIndex(s => s.id === serviceId)
    if (index > -1) {
      const service = favorites.value[index]
      if (service) {
        favorites.value.splice(index, 1)
        saveFavorites()
        toast.info(`${service.title} retiré des favoris`)
      }
    }
  }

  // Toggle favorite
  const toggleFavorite = (service: Service) => {
    if (isFavorite(service.id)) {
      removeFavorite(service.id)
    } else {
      addFavorite(service)
    }
  }

  // Check if service is favorite
  const isFavorite = (serviceId: number) => {
    return favorites.value.some(s => s.id === serviceId)
  }

  // Get favorites count
  const count = computed(() => favorites.value.length)

  return {
    favorites,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    isFavorite,
    count,
    loadFavorites
  }
})
