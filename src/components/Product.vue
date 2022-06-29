<template>
  <div class="flex flex-col">
    <img class="product__image mb-4" v-if="product.photoUrl" :src="product.photoUrl" alt="Photo" />
    <h1 class="product__name text-4xl font-semibold">{{ product.name }}</h1>
    <h2 class="product__price">
      <span class="product__discount-price font-bold text-red-600 text-xl">{{ product.price }}₽</span>
      ({{ product.basePrice }}₽)
    </h2>
    <p class="text-gray-500">Арт. {{ product.ean }}</p>
  </div>
</template>

<script setup lang="ts">
export interface ProductModel {
  name: string
  photoUrl?: string
  ean?: string
  price?: number
  basePrice?: number
  offer?: unknown
}

defineProps<{
  product: ProductModel,
}>()
</script>

<style>
.product__image {
  max-height: 56.25%;
  object-fit: contain;
}
</style>
