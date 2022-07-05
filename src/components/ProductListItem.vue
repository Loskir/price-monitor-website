<template>
  <div class="flex flex-row h-24 justify-start relative">
    <img class="mr-4 product__image w-24 p-1 flex-shrink-0" v-if="product.photoUrl" :src="product.photoUrl"
      alt="Photo" />
    <div class="flex flex-col justify-center">
      <h1 class="text-xl font-semibold">
        <RouterLink :to="`/product/${product.productId}`" class="product-list-item__router-link">
          {{ product.name }}
        </RouterLink>
      </h1>
      <h2 v-if="product.price">
        <template v-if="product.price.price !== product.price.basePrice">
          <span class="font-bold text-green-600">
            {{ product.price.price }}₽
          </span> <s>
            {{ product.price.basePrice }}₽
          </s>
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
import { RouterLink } from 'vue-router'

defineProps<{
  product: ProductWithPriceModel,
}>()
</script>

<style scoped>
.product__image {
  /* width: 100%; */
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
