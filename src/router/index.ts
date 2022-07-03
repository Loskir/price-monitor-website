import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/scanner',
      name: 'scanner',
      component: () => import('../views/ScannerView.vue'),
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('../views/SearchView.vue'),
    },
    {
      path: '/product/ean/:ean',
      name: 'productEan',
      component: () => import('../views/ProductEanView.vue'),
    },
  ],
})

export default router
