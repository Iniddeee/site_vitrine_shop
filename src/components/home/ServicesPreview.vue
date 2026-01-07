<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import ServiceCard from '@/components/services/ServiceCard.vue'
import servicesData from '@/data/services.json'
import type { Service } from '@/types/services'

const featuredServices = ref<Service[]>([])

onMounted(() => {
  // Get first 4 services as featured
  featuredServices.value = servicesData.slice(0, 4) as Service[]
})
</script>

<template>
  <section class="py-16 md:py-24 bg-gray-50 dark:bg-gray-900">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12" data-aos="fade-up">
        <h2 class="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
          Nos Services Populaires
        </h2>
        <p class="mt-4 max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-400">
          Découvrez notre sélection de services les plus demandés par nos clients.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <ServiceCard
          v-for="(service, index) in featuredServices"
          :key="service.id"
          :service="service"
          :data-aos="'fade-up'"
          :data-aos-delay="index * 100"
        />
      </div>

      <div class="text-center" data-aos="fade-up" data-aos-delay="400">
        <RouterLink
          to="/services"
          class="btn-primary inline-flex items-center px-8 py-3"
        >
          Voir tous les services
        </RouterLink>
      </div>
    </div>
  </section>
</template>
