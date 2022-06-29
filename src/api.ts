const apiRoot = import.meta.env.VITE_API_ROOT

import type {ProductModel} from './components/Product.vue'

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
