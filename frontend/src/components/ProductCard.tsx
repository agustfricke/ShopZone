import { Product } from "../types"
import {  useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteReq } from "../api/Products"
import { useCartStore } from "../store/CartStore"

interface Props {
  product: Product
}

const ProductCard = ({ product }: Props) => {

  const queryClient = useQueryClient()

  const deleteProdMutation = useMutation({
    mutationFn: deleteReq,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['prods']})
    },
    onError: (error) => {
      console.error(error)
    }
  })

  const addToCart = useCartStore(state => state.addToCart)
  const removeFromCart = useCartStore(state => state.removeFromCart)

  return (
    <>
      {product.name} 
      <button
        type='button'
        className='ml-2 bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600'
        onClick={() => addToCart(product)}
        >
        Add to Cart
      </button>
      <button onClick={() => removeFromCart(product)}>Remove from Cart</button>
      <button onClick={() => deleteProdMutation.mutate(product.id)}>Delete</button>
      </>
  )
}

export default ProductCard
