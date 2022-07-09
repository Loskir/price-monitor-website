<template>
  <div class="flex flex-col">
    <img class="product__image mb-4" v-if="product.photoUrl" :src="product.photoUrl" alt="Photo" />
    <h1 class="product__name text-2xl font-semibold">{{ product.name }}</h1>
    <h2 class="pt-1" v-if="product.price">
      <template v-if="product.price.price !== product.price.basePrice">
        <span class="font-bold text-green-600 text-2xl">
          {{ product.price.price }}₽
        </span> <s>
          {{ product.price.basePrice }}₽
        </s>
      </template>
      <template v-else>
        <span class="font-bold text-2xl">{{ product.price.price }}₽</span>
      </template>
    </h2>
    <p class="text-gray-500 pt-1">Арт. {{ product.ean }}</p>
    <p class="text-gray-500">ID: {{ product.productId }}</p>
    <p class="text-gray-500" v-if="product.price">Обновлено {{
        DateTime.fromISO(product.price.time).setLocale('ru').toFormat('dd MMMM в HH:mm ZZZZ')
    }}</p>
  </div>
</template>

<script setup lang="ts">
import type { ProductWithPriceModel } from '@/models/Product'
import { DateTime } from 'luxon'

defineProps<{
  product: ProductWithPriceModel,
}>()
</script>

<style scoped>
.product__image {
  width: 100%;
  object-fit: contain;
  max-height: 300px;
}
</style>
