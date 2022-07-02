export interface Offer {

}

export interface ProductModel {
  productId: string
  name: string
  photoUrl?: string
  ean?: string
}
export interface ProductWithPriceModel extends ProductModel {
  price?: ProductPriceModel
}

export interface ProductPriceModel {
  price: number
  basePrice: number
  offer?: Offer
  time: string
}
