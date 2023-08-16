export interface Product {
  id?: number
  name: string
  slug?: string
  description: string
  price: number
  rating?: number
  count_in_stock : number
  category: string
  image: File | null;
  quantity?: number
  num_reviews?: number
}

export interface Order {
    total_price: number;
    address: string
    city: string
    postal_code: string
    order_items: Product[]
};


export interface User {
    id?: number;
    avatar: File | null;
    email: string;
    name: string;
    last_name: string;
};

export interface Token {
    user_id: number;
    exp: number;
    is_staff: boolean;
    email: string;
    name: string;
    last_name: string;
    avatar: File | null;
};
