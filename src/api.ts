const apiRoot = import.meta.env.VITE_API_ROOT
import type { ProductWithPriceModel, ProductPriceModel } from '@/models/Product'
import type { CategoryModel } from './models/Category'

export function getProductById(id: string): Promise<ProductWithPriceModel | undefined> {
  return fetch(`${apiRoot}/products/${id}`)
    .then(async (res) => {
      if (res.status === 404) {
        return
      }
      if (res.status > 400) {
        throw new Error() // todo
      }
      return await res.json() as ProductWithPriceModel
    })
}

export function getProductHistoryById(id: string): Promise<ProductPriceModel[]> {
  return fetch(`${apiRoot}/product/${id}/history`)
    .then(async (res) => {
      if (res.status === 404) {
        return []
      }
      if (res.status > 400) {
        throw new Error() // todo
      }
      return await res.json() as ProductPriceModel[]
    })
}

export function searchProducts(query: string): Promise<ProductWithPriceModel[]> {
  const queryString = new URLSearchParams({
    query,
  })
  return fetch(`${apiRoot}/products/search?${queryString}`)
    .then(async (res) => {
      if (res.status > 400) {
        throw new Error() // todo
      }
      return await res.json() as ProductWithPriceModel[]
    })
}

export function getCategories(parentId: number | null): Promise<CategoryModel[]> {
  const params = parentId !== null
    ? new URLSearchParams({ parentId: parentId.toString() })
    : new URLSearchParams()
  return fetch(`${apiRoot}/categories?${params}`)
    .then(async (res) => {
      if (res.status > 400) {
        throw new Error() // todo
      }
      return await res.json() as CategoryModel[]
    })
}

export function getProductsByCategory(categoryId: number): Promise<ProductWithPriceModel[]> {
  return fetch(`${apiRoot}/categories/${categoryId}/products`)
    .then(async (res) => {
      if (res.status > 400) {
        throw new Error() // todo
      }
      return await res.json() as ProductWithPriceModel[]
    })
}
