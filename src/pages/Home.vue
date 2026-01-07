<script setup lang="ts">
import { onMounted } from 'vue'
import HeroSection from '@/components/home/HeroSection.vue'
import ServicesPreview from '@/components/home/ServicesPreview.vue'
import Testimonials from '@/components/home/Testimonials.vue'
import { useAOS } from '@/composables/useAOS'

onMounted(() => {
  useAOS()
})
</script>

<template>
  <div class="overflow-x-hidden">
    <HeroSection />
    <section data-aos="fade-up">
      <ServicesPreview />
    </section>
    <section data-aos="fade-up">
      <Testimonials />
    </section>
  </div>
</template>
