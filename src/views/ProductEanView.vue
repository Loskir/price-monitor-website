<template>
  <div class="max-w-xl mx-auto p-8">
    <div class="absolute inset-12 flex flex-col justify-center" v-if="store.isLoading">
      <span class="text-center">Loading...</span>
    </div>
    <div v-else-if="store.error">{{ store.error }}</div>
    <div class="absolute inset-12 flex flex-col justify-center" v-else-if="!store.product">
      <span class="text-center">Not found :(</span>
    </div>
    <template v-else>
      <Product :product="store.product" />
      <ProductHistoryGraph :history="store.history" v-if="store.history" />
    </template>
  </div>
</template>

<script setup lang="ts">
import { watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import Product from '../components/Product.vue'
import { useProductStore } from '@/stores/product'
import ProductHistoryGraph from '../components/ProductHistoryGraph.vue'

const store = useProductStore()

const route = useRoute()
const ean = route.params.ean as string

watchEffect(() => {
  store.load(ean)
})
</script>

<!-- <style></style> -->
