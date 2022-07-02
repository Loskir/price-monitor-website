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
