import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export interface Cart {
  id: string;
}

interface CartState {
  cart: Cart[];
  add: (id: string) => void;
  remove: (id: string) => void;
}

export const useStore = create<CartState>()(
  persist(
    (set) => ({
      cart: [],
  add: (id: string) => {
    set((state) => ({
      cart: [
        ...state.cart,
        {
          id
        } as Cart,
      ],
    }));
  },
  remove: (id) => {
    set((state) => ({
      cart: state.cart.filter((cart) => cart.id !== id),
    }));
  },
    }),
    {
      name: 'cartItems', 
      storage: createJSONStorage(() => sessionStorage), 
      partialize: (state) => ({ cart: state.cart }),
    }
  )
)


