import { useCartStore } from "../store/cart"

const Order = () => {

  const removeFromCart = useCartStore(state => state.removeFromCart)
  const cart = useCartStore(state => state.cart);
  const total_price = useCartStore(state => state.totalPrice);

  // Expected data to create order
  const order = {
    total_price: total_price,
    address: 'Balcon',
    city: 'Cordoba',
    country: 'Argentina',
    postal_code: '5000',
    shipping_price: '12',
    order_items: cart,
    // order_items: [
    //   {id: 9, name: 'Golang', quantity: 1, price: 12},
    //   {id: 10, name: 'test', quantity: 2, price: 10},
    // ]
  }

    return (

        <>
        <h1> me Daddy! </h1>

    <div>
      Total items
      {cart.length}
      Totalll
      {total_price}
      {cart.map(product => (
        <>
          <h1>{product.name}</h1> 
          <p> {product.quantity}</p>
        <button onClick={() => removeFromCart(product)}>Remove from Cart</button>
          </>
      ))}
      <button>Add Order</button>
    </div>
        </>
    )
    
}

export default Order;
