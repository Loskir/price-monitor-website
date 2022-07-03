import { searchProducts} from '@/api'
import type { ProductWithPriceModel } from '@/models/Product'
import { defineStore } from 'pinia'

export const useSearchStore = defineStore('product', {
  state: (): {
    isLoading: boolean,
    error?: string,
    products: ProductWithPriceModel[],
    currentI: number,
    lastI: number,
  } => ({
    products: [],
    isLoading: false,
    error: undefined,
    currentI: 0,
    lastI: 0,
  }),

  actions: {
    async load(query: string) {
      if (query === '') {
        this.isLoading = false
        this.products = []
        return
      }
      this.isLoading = true
      const i = ++this.currentI
      console.log('start request', i)
      await searchProducts(query)
        .then((res) => {
          console.log('got response', i, this.lastI)
          if (i > this.lastI) {
            this.products = res
          }
        })
        .catch((e) => {
          console.log(e)
          this.error = 'Error!'
        })
        .finally(() => {
          console.log('check isLoading', i, this.currentI)
          if (this.currentI === i) {
            this.isLoading = false
          }
          this.lastI = i
        })
    }
  },
})
