<script setup lang="ts">
import { Trash2, Plus, Minus } from 'lucide-vue-next'
import type { CartItem } from '@/stores/cart'
import { useCartStore } from '@/stores/cart'

interface Props {
  item: CartItem
}

const props = defineProps<Props>()

const cartStore = useCartStore()

const updateQuantity = (newQuantity: number) => {
  cartStore.updateQuantity(props.item.id, newQuantity)
}

const removeItem = () => {
  cartStore.removeFromCart(props.item.id)
}

const formatPrice = (price: number | 'Sur devis', quantity: number = 1) => {
  if (price === 'Sur devis') return price
  return new Intl.NumberFormat('fr-CH', {
    style: 'currency',
    currency: 'CHF',
  }).format(price * quantity)
}
</script>

<template>
  <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
    <div class="flex flex-col md:flex-row gap-4">
      <!-- Info -->
      <div class="flex-1">
        <div class="flex items-start justify-between mb-2">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
            {{ item.title }}
          </h3>
          <button @click="removeItem" class="text-red-500 hover:text-red-700 p-1">
            <Trash2 class="h-5 w-5" />
          </button>
        </div>
        <p class="text-gray-600 dark:text-gray-400 mb-4">
          {{ item.category }} • {{ item.duration }}
        </p>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Prix unitaire: {{ formatPrice(item.price) }}
        </p>
      </div>

      <!-- Quantity & Total -->
      <div class="flex flex-col items-end justify-between">
        <div class="flex items-center mb-4">
          <button
            @click="updateQuantity(item.quantity - 1)"
            class="p-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <Minus class="h-4 w-4" />
          </button>
          <span class="mx-4 font-medium text-lg w-8 text-center">{{ item.quantity }}</span>
          <button
            @click="updateQuantity(item.quantity + 1)"
            class="p-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <Plus class="h-4 w-4" />
          </button>
        </div>
        <p class="text-xl font-bold text-primary-600 dark:text-primary-400">
          {{ formatPrice(item.price, item.quantity) }}
        </p>
      </div>
    </div>
  </div>
</template>
