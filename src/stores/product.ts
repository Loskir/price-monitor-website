import { getProductById, getProductHistoryById } from '@/api'
import type { ProductWithPriceModel, ProductPriceModel } from '@/models/Product'
import { defineStore } from 'pinia'

export const useProductStore = defineStore('product', {
  state: (): {
    product: ProductWithPriceModel | undefined,
    isLoading: boolean,
    error?: string,
    history: ProductPriceModel[],
  } => ({
    product: undefined,
    isLoading: false,
    error: undefined,
    history: [],
  }),

  actions: {
    async load(id: string) {
      this.$reset()
      this.isLoading = true
      await getProductById(id)
        .then((res) => {
          this.product = res
        })
        .catch((e) => {
          console.log(e)
          this.error = 'Error!'
        })
        .finally(() => {
          this.isLoading = false
        })
      if (this.product) {
        await getProductHistoryById(this.product.productId)
          .then((res) => {
            this.history = res
          })
      }
    }
  },
})
