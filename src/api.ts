const apiRoot = import.meta.env.VITE_API_ROOT
import type { ProductWithPriceModel, ProductPriceModel } from '@/models/Product'

export function getProductByEan(ean: string): Promise<ProductWithPriceModel | undefined> {
  return fetch(`${apiRoot}/product/ean/${ean}`)
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
    .finally(() => new Promise((r) => setTimeout(r, 1000)))
    .then(async (res) => {
      if (res.status > 400) {
        throw new Error() // todo
      }
      return await res.json() as ProductWithPriceModel[]
    })
}
