const apiRoot = import.meta.env.VITE_API_ROOT
import type { ProductModel, ProductPriceModel } from '@/models/Product'

export function getProductByEan(ean: string): Promise<ProductModel | undefined> {
  return fetch(`${apiRoot}/product/ean/${ean}`)
    .then(async (res) => {
      if (res.status === 404) {
        return
      }
      if (res.status > 400) {
        throw new Error() // todo
      }
      return await res.json() as ProductModel
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
