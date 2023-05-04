import React, { useState, ChangeEvent } from 'react';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createOrder } from '../api/Order';
import { Cstore } from '../cStore';

const Order = () => {

  const { cart }  = Cstore();
  // const queryClient = useQueryClient();

  // const createOrderMutation = useMutation({
  //   mutationFn: createOrder ,
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ["order"] });
  //   },
  //   onError: (error) => {
  //     console.error(error);
  //   },
  // });

  // const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //     createOrderMutation.mutate(order);
  // };

const countDuplicates = (cart) =>
  cart.reduce((acc, obj) => {
    const key = `${obj.id}-${obj.name}`;
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});

console.log(countDuplicates(cart)); // { "9-golanggggg": 3, "10-C": 1 }

  const duplicateItems = Object.keys(countDuplicates(cart)).map((key) => ({
    key,
    count: countDuplicates(cart)[key],
  }));

  return (

 <div>
      {duplicateItems.map((item) => (
        <div key={item.key}>
          {item.key} (x{item.count})
        </div>
      ))}
    </div>

  )
}

export default Order
