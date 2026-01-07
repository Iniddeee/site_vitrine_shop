<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { ShoppingBag, ArrowLeft, Trash2 } from 'lucide-vue-next'
import CartItem from '@/components/shop/CartItem.vue'
import { useCartStore } from '@/stores/cart'

const cartStore = useCartStore()

const cartItems = computed(() => cartStore.cart)
const isEmpty = computed(() => cartItems.value.length === 0)
const cartTotal = computed(() => cartStore.formattedTotal)
const cartCount = computed(() => cartStore.count)

const clearCart = () => {
  if (confirm('Êtes-vous sûr de vouloir vider votre panier ?')) {
    cartStore.clearCart()
  }
}

const proceedToCheckout = () => {
  // Here you would integrate with a payment provider
  alert('Redirection vers la page de paiement...')
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="mb-8">
        <RouterLink
          to="/shop"
          class="inline-flex items-center text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 mb-4"
        >
          <ArrowLeft class="h-4 w-4 mr-2" />
          Continuer mes achats
        </RouterLink>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white flex items-center">
          <ShoppingBag class="h-8 w-8 mr-3" />
          Mon Panier ({{ cartCount }})
        </h1>
      </div>

      <div v-if="!isEmpty" class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Cart Items -->
        <div class="lg:col-span-2 space-y-4">
          <CartItem
            v-for="item in cartItems"
            :key="item.id"
            :item="item"
          />
          
          <!-- Clear Cart -->
          <div class="text-right">
            <button
              @click="clearCart"
              class="text-red-500 hover:text-red-700 inline-flex items-center"
            >
              <Trash2 class="h-4 w-4 mr-1" />
              Vider le panier
            </button>
          </div>
        </div>

        <!-- Order Summary -->
        <div class="lg:col-span-1">
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 sticky top-24">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Récapitulatif
            </h2>
            
            <div class="space-y-2 mb-4">
              <div class="flex justify-between text-gray-600 dark:text-gray-400">
                <span>Sous-total</span>
                <span>{{ cartTotal }}</span>
              </div>
              <div class="flex justify-between text-gray-600 dark:text-gray-400">
                <span>Livraison</span>
                <span>Gratuite</span>
              </div>
              <div class="flex justify-between text-gray-600 dark:text-gray-400">
                <span>TVA (20%)</span>
                <span>Incluse</span>
              </div>
            </div>

            <div class="border-t border-gray-200 dark:border-gray-700 pt-4 mb-6">
              <div class="flex justify-between text-lg font-bold text-gray-900 dark:text-white">
                <span>Total</span>
                <span class="text-primary-600 dark:text-primary-400">{{ cartTotal }}</span>
              </div>
            </div>

            <div class="space-y-3">
              <button
                @click="proceedToCheckout"
                class="w-full btn-primary"
              >
                Procéder au paiement
              </button>
              <RouterLink
                to="/contact"
                class="w-full btn-secondary block text-center"
              >
                Demander un devis
              </RouterLink>
            </div>

            <div class="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <p class="text-sm text-gray-600 dark:text-gray-400 text-center">
                <svg class="w-4 h-4 inline mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
                </svg>
                Paiement sécurisé et crypté
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-16">
        <div class="inline-flex items-center justify-center w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full mb-6">
          <ShoppingBag class="h-10 w-10 text-gray-400" />
        </div>
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
          Votre panier est vide
        </h2>
        <p class="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
          Découvrez nos services et ajoutez ceux qui vous intéressent à votre panier.
        </p>
        <RouterLink
          to="/shop"
          class="btn-primary inline-flex items-center"
        >
          <ShoppingBag class="h-5 w-5 mr-2" />
          Découvrir la boutique
        </RouterLink>
      </div>
    </div>
  </div>
</template>
