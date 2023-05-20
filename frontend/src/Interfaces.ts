export interface Product {
  id: string
  name: string
  description: string
  price: string
  rating: number
  stock: string
  category: string
  image: File
  quantity?: number
  num_reviews?: number
}
