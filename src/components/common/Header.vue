<!-- Header principal avec navigation responsive -->
<script setup lang="ts">
import { ref, computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { ShoppingCart, Moon, Sun, Menu, X, Wrench } from 'lucide-vue-next'
import { useCartStore } from '@/stores/cart'

defineOptions({
  name: 'TheHeader',
})

const route = useRoute()
const cartStore = useCartStore()

const isDarkMode = ref(false)
const isMobileMenuOpen = ref(false)

const navigation = [
  { name: 'Accueil', href: '/' },
  { name: 'Réparations', href: '/services' },
  { name: 'Devis', href: '/shop' },
  { name: 'À Propos', href: '/about' },
  { name: 'Contact', href: '/contact' },
]

const cartCount = computed(() => cartStore.count)

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value
  document.documentElement.classList.toggle('dark')
}

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}
</script>

<template>
  <header class="bg-white dark:bg-gray-900 shadow-sm sticky top-0 z-40">
    <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo -->
        <RouterLink to="/" class="flex items-center space-x-2">
          <Wrench class="h-8 w-8 text-primary-600 dark:text-primary-400" />
          <span class="text-xl font-bold text-gray-900 dark:text-white">Shop</span>
        </RouterLink>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center space-x-8">
          <RouterLink
            v-for="item in navigation"
            :key="item.name"
            :to="item.href"
            class="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 px-3 py-2 text-sm font-medium transition-colors"
            :class="{ 'text-primary-600 dark:text-primary-400': route.path === item.href }"
          >
            {{ item.name }}
          </RouterLink>
        </div>

        <!-- Actions -->
        <div class="hidden md:flex items-center space-x-4">
          <!-- Cart -->
          <RouterLink
            to="/cart"
            class="relative p-2 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
          >
            <ShoppingCart class="h-5 w-5" />
            <span
              v-if="cartCount > 0"
              class="absolute -top-1 -right-1 h-5 w-5 bg-primary-600 text-white text-xs rounded-full flex items-center justify-center"
            >
              {{ cartCount }}
            </span>
          </RouterLink>

          <!-- Dark Mode Toggle -->
          <button
            @click="toggleDarkMode"
            class="p-2 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
          >
            <Sun v-if="isDarkMode" class="h-5 w-5" />
            <Moon v-else class="h-5 w-5" />
          </button>
        </div>

        <!-- Mobile menu button -->
        <div class="md:hidden">
          <button
            @click="toggleMobileMenu"
            class="p-2 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
          >
            <Menu v-if="!isMobileMenuOpen" class="h-6 w-6" />
            <X v-else class="h-6 w-6" />
          </button>
        </div>
      </div>

      <!-- Mobile menu -->
      <Transition
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="transform scale-95 opacity-0"
        enter-to-class="transform scale-100 opacity-100"
        leave-active-class="transition duration-200 ease-in"
        leave-from-class="transform scale-100 opacity-100"
        leave-to-class="transform scale-95 opacity-0"
      >
        <div v-if="isMobileMenuOpen" class="md:hidden">
          <div class="px-2 pt-2 pb-3 space-y-1">
            <RouterLink
              v-for="item in navigation"
              :key="item.name"
              :to="item.href"
              class="block px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md"
              @click="toggleMobileMenu"
            >
              {{ item.name }}
            </RouterLink>
          </div>

          <div class="pt-4 pb-3 border-t border-gray-200 dark:border-gray-700">
            <div class="flex items-center justify-around">
              <RouterLink
                to="/cart"
                class="flex items-center space-x-3 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 px-3 py-2 text-base font-medium transition-colors"
                @click="toggleMobileMenu"
              >
                <ShoppingCart class="h-5 w-5" />
                <span
                  v-if="cartCount > 0"
                  class="absolute -top-1 -right-1 h-5 w-5 bg-primary-600 text-white text-xs rounded-full flex items-center justify-center"
                >
                  {{ cartCount }}
                </span>
              </RouterLink>

              <button
                @click="toggleDarkMode"
                class="p-2 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
              >
                <Sun v-if="isDarkMode" class="h-5 w-5" />
                <Moon v-else class="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </nav>
  </header>
</template>
