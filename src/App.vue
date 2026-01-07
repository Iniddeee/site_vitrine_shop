<!-- Composant racine de l'application -->
<!-- Structure principale avec header, contenu et footer -->

<script setup lang="ts">
import { RouterView } from 'vue-router'
import TheHeader from '@/components/common/Header.vue'
import TheFooter from '@/components/common/Footer.vue'
import ToastContainer from '@/components/ui/ToastContainer.vue'
</script>

<template>
  <div class="min-h-screen flex flex-col bg-white dark:bg-gray-900">
    <TheHeader />
    <main class="flex-1">
      <RouterView />
    </main>
    <TheFooter />
    <ToastContainer />
  </div>
</template>

<style>
/* Styles globaux définis dans main.css */
</style>
