// Configuration du routeur Vue
// Lazy loading des composants pour optimiser les performances

import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/pages/Home.vue'),
    },
    {
      path: '/services',
      name: 'services',
      component: () => import('@/pages/Services.vue'),
    },
    {
      path: '/services/:slug',
      name: 'service-detail',
      component: () => import('@/pages/ServiceDetail.vue'),
      props: true,
    },
    {
      path: '/shop',
      name: 'shop',
      component: () => import('@/pages/Shop.vue'),
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/pages/About.vue'),
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('@/pages/Contact.vue'),
    },
    {
      path: '/cart',
      name: 'cart',
      component: () => import('@/pages/Cart.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@/pages/NotFound.vue'),
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
})

export default router
