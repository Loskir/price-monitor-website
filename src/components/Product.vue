<template>
  <div class="flex flex-col">
    <img class="product__image mb-4" v-if="product.photoUrl" :src="product.photoUrl" alt="Photo" />
    <h1 class="product__name text-4xl font-semibold">{{ product.name }}</h1>
    <h2 class="product__price" v-if="product.price">
      <template v-if="product.price.price !== product.price.basePrice">
        <span class="font-bold text-red-600 text-xl">{{ product.price.price }}₽</span>
        ({{ product.price.basePrice }}₽)
      </template>
      <template v-else>
        <span class="font-bold text-xl">{{ product.price.price }}₽</span>
      </template>
      {{' '}}
      <span class="text-gray-500 text-xs">обновлено {{ DateTime.fromISO(product.price?.time).setLocale('ru').toFormat('dd MMMM в HH:mm ZZZZ') }}</span>
    </h2>
    <p class="text-gray-500">Арт. {{ product.ean }}</p>
    <p class="text-gray-500">ID: {{ product.productId }}</p>
  </div>
</template>

<script setup lang="ts">
import type { ProductModel } from '@/models/Product'
import { DateTime } from 'luxon'

defineProps<{
  product: ProductModel,
}>()
</script>

<style>
.product__image {
  width: 100%;
  aspect-ratio: 16/9;
  object-fit: contain;
}
</style>
