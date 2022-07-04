<template>
  <div class="flex flex-row h-24 justify-start">
    <img class="mr-4 product__image w-24 p-1" v-if="product.photoUrl" :src="product.photoUrl" alt="Photo" />
    <div class="flex flex-col justify-center">
      <h1 class="text-xl font-semibold">{{ product.name }}</h1>
      <h2 v-if="product.price">
        <template v-if="product.price.price !== product.price.basePrice">
          <span class="font-bold text-red-600">{{ product.price.price }}₽</span>
          {{' '}}<s>{{ product.price.basePrice }}₽</s>
        </template>
        <template v-else>
          <span class="font-bold">{{ product.price.price }}₽</span>
        </template>
      </h2>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ProductWithPriceModel } from '@/models/Product'

defineProps<{
  product: ProductWithPriceModel,
}>()
</script>

<style scoped>
.product__image {
  /* width: 100%; */
  object-fit: contain;
}
</style>
