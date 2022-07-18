import { getCategories, getProductsByCategory, SortOrder, SortType } from '@/api'
import type { CategoryModel } from '@/models/Category'
import type { ProductWithPriceModel } from '@/models/Product'
import { defineStore } from 'pinia'

export const useCategoryProductsStore = defineStore('categoryProducts', {
  state: () => ({
    isLoading: false,
    error: undefined as string | undefined,
    categories: [] as CategoryModel[],
    products: [] as ProductWithPriceModel[],
  }),

  actions: {
    async load(categoryId: number | null, {
      sort,
      sortOrder,
    }: {
      sort?: SortType
      sortOrder?: SortOrder
    } = {}) {
      this.$reset()
      if (categoryId === null) {
        return
      }
      this.isLoading = true
      await getProductsByCategory(categoryId, {
        sort,
        sortOrder,
      })
        .then((res) => {
          this.products = res
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
