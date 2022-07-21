<template>
  <div class="flex flex-col">
    <div class="flex flex-row justify-start relative items-stretch product-list-item">
      <img class="product__image h-24 w-24 mr-4 p-2 flex-shrink-0 flex-grow-0" v-if="product.photoUrl"
        :src="product.photoUrl" alt="Photo" />
      <div class="flex flex-col justify-center py-2 border-b border-gray-300 border-solid flex-grow">
        <h1 class="text-gray-800 font-medium leading-tight">
          <RouterLink :to="`/product/${product.productId}`" class="product-list-item__router-link">
            {{ product.name }}
          </RouterLink>
        </h1>
        <h2 v-if="product.price" class="mt-1 text-md">
          <template v-if="product.price.price !== product.price.basePrice">
            <span class="font-semibold text-green-600 text-lg">{{ product.price.price }}₽</span>
            <span class="line-through ml-1">{{ product.price.basePrice }}₽</span>
          </template>
          <template v-else>
            <span class="font-semibold text-xl">{{ product.price.price }}₽</span>
          </template>
          <span class="ml-2">{{ product.price?.unitPrice.toFixed(2) }}₽/{{ formatUom(product) }}</span>
        </h2>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ProductWithPriceModel } from '@/models/Product'
import { RouterLink } from 'vue-router'
import { formatUom } from '@/functions/product'

defineProps<{
  product: ProductWithPriceModel,
}>()
</script>

<style scoped>
.product__image {
  object-fit: contain;
}

.product-list-item__router-link::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  /* z-index: -1; */
}
</style>
