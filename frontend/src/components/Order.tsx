import React, { useState, ChangeEvent } from 'react';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createOrder } from '../api/Order';
import { Cstore } from '../cStore';

const Order = () => {

  const { cart }  = Cstore();
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

  console.log(cart)

const countDuplicates = (cart) =>
  cart.reduce((acc, obj) => {
    const key = `${obj.id}-${obj.name}`;
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});

  const duplicateItems = Object.keys(countDuplicates(cart)).map((key) => ({
    key,
    name: key.split("-")[1],
    count: countDuplicates(cart)[key],
  }));

  const order_items = duplicateItems.map((item) => ({
    id: item.key.split("-")[0],
    name: item.key.split("-")[1],
    quantity: item.count,
    // price: item.price,
  }));

  // const total_price = order_items.reduce((acc, obj) => {
  //   return acc + obj.price;
  // }, 0);


  // Expected data to create order
  const order = {
    total_price: 32,
    address: 'Balcon',
    city: 'Cordoba',
    country: 'Argentina',
    postal_code: '5000',
    shipping_price: '12',
    order_items: order_items,
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
      {duplicateItems.map((item) => (
        <div key={item.key}>
          {item.name} (x{item.count})
        </div>
      ))}
      <button onClick={addOrder}>Submit</button>
    </div>

  )
}

export default Order
