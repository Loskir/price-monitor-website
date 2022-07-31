<template>
  <div class="max-w-xl mx-auto p-8 min-h-screen flex flex-col">
    <input class="bg-gray-100 p-2 rounded w-full mb-1" v-model="state.query" />
    <div class="divide-y relative flex-grow">
      <div class="absolute inset-0 loading-overlay flex flex-col justify-center z-10" v-if="store.isLoading">
        <p class="text-center font-semibold">Loading...</p>
      </div>
      <ProductListItem :product="product" v-for="product in store.products" />
    </div>
    <p v-if="store.error">{{ store.error }}</p>
  </div>
</template>

<script setup lang="ts">
import { useSearchStore } from '@/stores/search'
import { reactive, watchEffect } from 'vue'
import ProductListItem from '../components/ProductListItem.vue'

const state = reactive({
  query: '2000000017006'
})

const store = useSearchStore()

watchEffect(() => {
  store.load(state.query)
})

</script>

<style scoped>
.loading-overlay {
  background-color: rgba(255, 255, 255, 0.7);
}
</style>
