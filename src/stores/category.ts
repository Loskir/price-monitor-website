import { getCategories, SortOrder, SortType } from '@/api'
import type { CategoryModel } from '@/models/Category'
import type { ProductWithPriceModel } from '@/models/Product'
import { defineStore } from 'pinia'

export const useCategoryStore = defineStore('categories', {
  state: () => ({
    isLoading: false,
    error: undefined as string | undefined,
    categories: [] as CategoryModel[],
    products: [] as ProductWithPriceModel[],
  }),

  actions: {
    async load(parentId: number | null) {
      this.$reset()
      this.isLoading = true
      await getCategories(parentId)
        .then((res) => {
          this.categories = res
        })
        .catch((e) => {
          console.log(e)
          this.error = 'Error!'
        })
        .finally(() => {
          this.isLoading = false
        })
    }
  },
})
