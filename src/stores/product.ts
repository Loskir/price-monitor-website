import { getProductByEan } from '@/api'
import type { ProductModel } from '@/components/Product.vue'
import { defineStore } from 'pinia'

export const useProductStore = defineStore('product', {
  state: (): {
    product: ProductModel | undefined,
    isLoading: boolean,
    error?: unknown
  } => ({
    product: undefined,
    isLoading: false,
  }),

  actions: {
    async load(ean: string) {
      this.isLoading = true
      await getProductByEan(ean)
        .then((res) => {
          this.product = res
        })
        .finally(() => {
          this.isLoading = false
        })
        .catch((e) => {
          console.log(e)
          this.error = 'Error!'
        })
    }
  },
})
