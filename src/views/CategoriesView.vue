<template>
  <main class="max-w-xl mx-auto">
    <p v-if="state.isLoading">Loading...</p>
    <template v-else>
      <p v-for="c in state.categories">
        <RouterLink :to="`/category/${c.categoryId}`">{{ c.name }}</RouterLink>
      </p>
      <div class="flex flex-col divide-y">
        <ProductListItem v-for="p in state.products" :product="p"/>
      </div>
    </template>
  </main>
</template>

<script setup lang="ts">
import { getCategories, getProductsByCategory } from '@/api'
import type { CategoryModel } from '@/models/Category'
import type { ProductWithPriceModel } from '@/models/Product';
import { onUnmounted, reactive, watchEffect } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import ProductListItem from '../components/ProductListItem.vue'

const state = reactive({
  isLoading: false,
  error: undefined as string | undefined,
  categories: [] as CategoryModel[],
  products: [] as ProductWithPriceModel[],
})

const route = useRoute()

const stop = watchEffect(() => {
  if (route.name !== 'categories' && route.name !== 'category') {
    return
  }
  state.isLoading = true
  let parentId: number | null = null
  if (route.params.id) {
    parentId = Number(route.params.id) || null
  }
  Promise.all([
    getCategories(parentId)
      .then((res) => {
        state.categories = res
      }),
    parentId !== null && getProductsByCategory(parentId)
      .then((res) => {
        state.products = res
      }),
  ])
    .catch((e) => {
      console.log(e)
      state.error = 'Error!'
    })
    .finally(() => {
      state.isLoading = false
    })
})

onUnmounted(() => stop())

</script>
