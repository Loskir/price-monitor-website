<template>
  <div v-if="isLoading">Loading...</div>
  <template v-else>
    <div v-if="product">
      <img v-if="product.photoUrl" :src="product.photoUrl" alt="Photo" />
      <p>
        {{ product.name }} {{ product.ean }} {{ product.price }}
        {{ product.basePrice }}
      </p>
    </div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else>Not found :(</div>
  </template>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'

interface Product {
  name: string
  photoUrl?: string
  ean?: string
  price?: number
  basePrice?: number
  offer?: unknown
}

const route = useRoute()
const isLoading = ref(true)
const product = ref<Product>()
const error = ref()
const apiRoot = import.meta.env.VITE_API_ROOT

watchEffect(() => {
  fetch(`${apiRoot}/product/ean/` + route.params.ean)
    .then(async (res) => {
      console.log('res')
      const data = await res.json()
      if (res.status === 200) {
        product.value = data
      }
    })
    .finally(() => {
      isLoading.value = false
    })
    .catch((e) => {
      console.log(e)
      error.value = 'Error!'
    })
})
</script>
