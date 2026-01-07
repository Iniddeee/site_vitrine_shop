<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-vue-next'
import { useCartStore } from '@/stores/cart'
import type { CartItem } from '@/stores/cart'

interface Props {
  isOpen: boolean
}

const props = defineProps<Props>()

const emit = defineEmits<{
  close: []
}>()

const cartStore = useCartStore()

const cartItems = computed(() => cartStore.cart)
const cartTotal = computed(() => cartStore.formattedTotal)
const isEmpty = computed(() => cartItems.value.length === 0)

const updateQuantity = (item: CartItem, newQuantity: number) => {
  cartStore.updateQuantity(item.id, newQuantity)
}

const removeItem = (item: CartItem) => {
  cartStore.removeFromCart(item.id)
}

const closeDrawer = () => {
  emit('close')
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
  <!-- Overlay -->
  <Transition
    enter-active-class="transition-opacity duration-300"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition-opacity duration-300"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      v-if="props.isOpen"
      class="fixed inset-0 bg-black bg-opacity-50 z-40"
      @click="closeDrawer"
    ></div>
  </Transition>

  <!-- Drawer -->
  <Transition
    enter-active-class="transition-transform duration-300"
    enter-from-class="translate-x-full"
    enter-to-class="translate-x-0"
    leave-active-class="transition-transform duration-300"
    leave-from-class="translate-x-0"
    leave-to-class="translate-x-full"
  >
    <div
      v-if="props.isOpen"
      class="fixed right-0 top-0 h-full w-full max-w-md bg-white dark:bg-gray-800 shadow-xl z-50 flex flex-col"
    >
      <!-- Header -->
      <div
        class="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700"
      >
        <h2 class="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
          <ShoppingBag class="h-5 w-5 mr-2" />
          Votre Panier ({{ cartStore.count }})
        </h2>
        <button
          @click="closeDrawer"
          class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <X class="h-5 w-5 text-gray-500 dark:text-gray-400" />
        </button>
      </div>

      <!-- Cart Items -->
      <div class="flex-1 overflow-y-auto p-4">
        <div v-if="isEmpty" class="text-center py-12">
          <ShoppingBag class="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p class="text-gray-500 dark:text-gray-400">Votre panier est vide</p>
          <RouterLink to="/shop" class="btn-primary inline-block mt-4" @click="closeDrawer">
            Découvrir la boutique
          </RouterLink>
        </div>

        <div v-else class="space-y-4">
          <div
            v-for="item in cartItems"
            :key="item.id"
            class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4"
          >
            <div class="flex items-start justify-between mb-2">
              <h4 class="font-medium text-gray-900 dark:text-white">
                {{ item.title }}
              </h4>
              <button @click="removeItem(item)" class="text-red-500 hover:text-red-700">
                <Trash2 class="h-4 w-4" />
              </button>
            </div>

            <p class="text-sm text-gray-600 dark:text-gray-400 mb-3">
              {{ item.category }} • {{ item.duration }}
            </p>

            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <button
                  @click="updateQuantity(item, item.quantity - 1)"
                  class="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-600"
                >
                  <Minus class="h-4 w-4" />
                </button>
                <span class="mx-3 font-medium">{{ item.quantity }}</span>
                <button
                  @click="updateQuantity(item, item.quantity + 1)"
                  class="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-600"
                >
                  <Plus class="h-4 w-4" />
                </button>
              </div>
              <span class="font-semibold text-primary-600 dark:text-primary-400">
                {{
                  formatPrice(
                    typeof item.price === 'number' ? item.price * item.quantity : 'Sur devis',
                  )
                }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div v-if="!isEmpty" class="border-t border-gray-200 dark:border-gray-700 p-4">
        <div class="flex items-center justify-between mb-4">
          <span class="text-lg font-semibold text-gray-900 dark:text-white"> Total </span>
          <span class="text-lg font-bold text-primary-600 dark:text-primary-400">
            {{ cartTotal }}
          </span>
        </div>
        <div class="space-y-2">
          <RouterLink to="/cart" class="btn-primary w-full block text-center" @click="closeDrawer">
            Voir le panier
          </RouterLink>
          <button @click="closeDrawer" class="btn-secondary w-full">Continuer mes achats</button>
        </div>
      </div>
    </div>
  </Transition>
</template>
