<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { Facebook, Instagram, Twitter, Wrench } from 'lucide-vue-next'

defineOptions({
  name: 'TheFooter',
})

const currentYear = new Date().getFullYear()

const navigation = {
  services: [
    { name: 'Réparation iPhone', href: '/services' },
    { name: 'Changement Batterie', href: '/services' },
    { name: 'Réparation Port', href: '/services' },
    { name: 'Dépannage Informatique', href: '/services' },
  ],
  legal: [{ name: 'Contact', href: '/contact' }],
}
</script>

<template>
  <footer class="bg-gray-900 text-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <!-- Brand -->
        <div class="lg:col-span-2">
          <div class="flex items-center mb-4">
            <Wrench class="h-8 w-8 text-primary-400 mr-3" />
            <span class="text-xl font-bold">Shop</span>
          </div>
          <p class="text-gray-400 mb-4 max-w-md">
            Votre service de réparation de confiance à Porrentruy. Intervention rapide et
            professionnelle pour tous vos appareils.
          </p>
          <div class="flex space-x-4">
            <a href="#" class="text-gray-400 hover:text-primary-400 transition-colors">
              <Facebook class="h-5 w-5" />
            </a>
            <a href="#" class="text-gray-400 hover:text-primary-400 transition-colors">
              <Instagram class="h-5 w-5" />
            </a>
            <a href="#" class="text-gray-400 hover:text-primary-400 transition-colors">
              <Twitter class="h-5 w-5" />
            </a>
          </div>
        </div>

        <!-- Services -->
        <div>
          <h3 class="text-sm font-semibold uppercase tracking-wider mb-4">Services</h3>
          <ul class="space-y-3">
            <li v-for="item in navigation.services" :key="item.name">
              <RouterLink
                :to="item.href"
                class="text-gray-400 hover:text-primary-400 transition-colors"
              >
                {{ item.name }}
              </RouterLink>
            </li>
          </ul>
        </div>

        <!-- Legal -->
        <div>
          <h3 class="text-sm font-semibold uppercase tracking-wider mb-4">Info</h3>
          <ul class="space-y-3">
            <li v-for="item in navigation.legal" :key="item.name">
              <RouterLink
                :to="item.href"
                class="text-gray-400 hover:text-primary-400 transition-colors"
              >
                {{ item.name }}
              </RouterLink>
            </li>
          </ul>
        </div>
      </div>

      <!-- Bottom -->
      <div class="mt-12 pt-8 border-t border-gray-800">
        <div class="flex flex-col md:flex-row justify-between items-center">
          <p class="text-gray-400 text-sm">{{ currentYear }} Shop. Tous droits réservés.</p>
          <p class="text-gray-400 text-sm mt-1">Développé par Zakaria Eddini</p>
          <div class="mt-4 md:mt-0 flex space-x-6">
            <RouterLink
              v-for="item in navigation.legal"
              :key="item.name"
              :to="item.href"
              class="text-gray-400 hover:text-primary-400 text-sm transition-colors"
            >
              {{ item.name }}
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
