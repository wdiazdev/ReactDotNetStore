export interface Product {
  id: number
  name: string
  description: string
  price: number
  pictureUrl: string
  type?: string
  brand: string
  quantityInStock?: number
}

export interface BasketItem {
  productId: number
  name: string
  price: number
  pictureUrl: string
  type: string
  brand: string
  quantity: number
}

export interface Basket {
  id: number
  buyerId: string
  items: BasketItem[]
}

export interface ProductParams {
  orderBy: string
  searchTerm?: string
  brands?: string[]
  types?: string[]
  pageNumber: number
  pageSize: number
}
