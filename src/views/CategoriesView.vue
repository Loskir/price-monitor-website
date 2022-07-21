<template>
  <main class="max-w-xl mx-auto mt-4 px-4">
    <p v-if="categoryStore.isLoading">Loading...</p>
    <div class="flex flex-wrap gap-2 mb-4" v-else-if="categoryStore.categories.length > 0">
      <RouterLink 
        v-for="c in categoryStore.categories" 
        :to="`/category/${c.categoryId}`"
        class="px-4 py-2 bg-gray-100 rounded-full"
        >{{ c.name }}</RouterLink>
    </div>
    <div>
      <select class="bg-gray-100 p-4 rounded rounded-r-none h-14" v-model="state.sort">
        <option value="name">По названию</option>
        <option value="price">По цене</option>
        <option value="unitPrice">По удельной цене</option>
      </select>
      <button class="p-4 rounded rounded-l-none bg-gray-100 h-14" @click="flipOrder">{{ state.sortOrder ===
          SortOrder.asc ? '↑' : '↓'
      }}</button>
    </div>
    <div v-if="categoryProductsStore.isLoading">Loading...</div>
    <div class="flex flex-col mt-4" v-else>
      <ProductListItem v-for="p in categoryProductsStore.products" :product="p" />
    </div>
  </main>
</template>

<script setup lang="ts">
import { SortOrder, SortType } from '@/api'
import { useCategoryStore } from '@/stores/category';
import { useCategoryProductsStore } from '@/stores/categoryProducts';
import { onUnmounted, reactive, watchEffect } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import ProductListItem from '../components/ProductListItem.vue'

const categoryStore = useCategoryStore()
const categoryProductsStore = useCategoryProductsStore()

const state = reactive({
  sort: SortType.name,
  sortOrder: SortOrder.asc,
})

const flipOrder = () => {
  state.sortOrder = state.sortOrder === SortOrder.asc
    ? SortOrder.desc
    : SortOrder.asc
}

const route = useRoute()

const categoriesWatcherStop = watchEffect(() => {
  if (route.name !== 'categories' && route.name !== 'category') {
    return
  }
  let parentId: number | null = null
  if (route.params.id) {
    parentId = Number(route.params.id) || null
  }
  categoryStore.load(parentId)
})

const productsWatcherStop = watchEffect(() => {
  if (route.name !== 'categories' && route.name !== 'category') {
    return
  }
  let parentId: number | null = null
  if (route.params.id) {
    parentId = Number(route.params.id) || null
  }
  categoryProductsStore.load(parentId, {
    sort: state.sort,
    sortOrder: state.sortOrder,
  })
})

onUnmounted(() => {
  categoriesWatcherStop()
  productsWatcherStop()
})

</script>
