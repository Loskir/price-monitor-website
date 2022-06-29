<template>
  <div class="product__container m-8">
    <img class="product__image mb-4" v-if="product.photoUrl" :src="product.photoUrl" alt="Photo" />
    <h1 class="product__name text-4xl font-semibold">{{ product.name }}</h1>
    <h2 class="product__price">
      <span class="product__discount-price font-bold text-red-600 text-xl">{{ product.price }}₽</span>
      ({{ product.basePrice }}₽)
    </h2>
    <p class="product__ean">Арт. {{ product.ean }}</p>
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
.product__container {
  display: flex;
  flex-direction: column;
}

.product__image-container {
  max-height: 40vh;
  width: auto;
  display: flex;
  justify-content: center;
}

.product__image {
  max-height: 40vh;
  object-fit: contain;
}
</style>
