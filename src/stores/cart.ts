import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Service } from '@/types/services'
import { useToast } from '@/composables/useToast'

export interface CartItem extends Service {
  quantity: number
}

export const useCartStore = defineStore('cart', () => {
  const cart = ref<CartItem[]>([])
  const toast = useToast()

  // Load cart from localStorage
  const loadCart = () => {
    const stored = localStorage.getItem('cart')
    if (stored) {
      cart.value = JSON.parse(stored)
    }
  }

  // Save cart to localStorage
  const saveCart = () => {
    localStorage.setItem('cart', JSON.stringify(cart.value))
  }

  // Initialize on store creation
  loadCart()

  // Add to cart
  const addToCart = (service: Service, quantity: number = 1) => {
    const existingItem = cart.value.find(item => item.id === service.id)
    
    if (existingItem) {
      existingItem.quantity += quantity
      toast.success(`Quantité de ${service.title} mise à jour`)
    } else {
      cart.value.push({ ...service, quantity })
      toast.success(`${service.title} ajouté au panier`)
    }
    
    saveCart()
  }

  // Remove from cart
  const removeFromCart = (serviceId: number) => {
    const index = cart.value.findIndex(item => item.id === serviceId)
    if (index > -1) {
      const service = cart.value[index]
      if (service) {
        cart.value.splice(index, 1)
        saveCart()
        toast.info(`${service.title} retiré du panier`)
      }
    }
  }

  // Update quantity
  const updateQuantity = (serviceId: number, quantity: number) => {
    const item = cart.value.find(item => item.id === serviceId)
    if (item) {
      if (quantity <= 0) {
        removeFromCart(serviceId)
      } else {
        item.quantity = quantity
        saveCart()
      }
    }
  }

  // Clear cart
  const clearCart = () => {
    cart.value = []
    saveCart()
    toast.info('Panier vidé')
  }

  // Get cart total
  const total = computed(() => {
    return cart.value.reduce((sum, item) => {
      const price = typeof item.price === 'number' ? item.price : 0
      return sum + (price * item.quantity)
    }, 0)
  })

  // Get cart count (total items)
  const count = computed(() => {
    return cart.value.reduce((sum, item) => sum + item.quantity, 0)
  })

  // Get formatted total
  const formattedTotal = computed(() => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    }).format(total.value)
  })

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    total,
    count,
    formattedTotal,
    loadCart
  }
})
