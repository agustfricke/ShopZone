export interface Product {
  id?: number
  name: string
  description: string
  price: number
  rating?: number
  count_in_stock : number
  category: string
  image: File | null;
  quantity?: number
  num_reviews?: number
}

export interface Token {
    exp: number
};
