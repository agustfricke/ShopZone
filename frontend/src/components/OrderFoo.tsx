import React, { useState, ChangeEvent } from 'react';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createOrder } from '../api/Order';
import { useCartStore } from "../store/CartStore"

const OrderFoo = () => {

  const cart = useCartStore(state => state.cart);
  const total_price = useCartStore(state => state.totalPrice);
  console.log(cart)
  


  const queryClient = useQueryClient();

  const createOrderMutation = useMutation({
    mutationFn: createOrder ,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["order"] });
    },
    onError: (error) => {
      console.error(error);
    },
  });

  console.log(total_price)
  console.log(cart)

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

  function addOrder() {
    createOrderMutation.mutate(order);
  }

  return (
    <div>
      Total items
      {cart.length}
      Totalll
      {total_price}
      {cart.map(item => (
        <>
          <h1>{item.name}</h1> 
          <p> {item.quantity}</p>
          </>
      ))}
      <button onClick={addOrder}>Add Order</button>
    </div>
  )
}

export default OrderFoo
