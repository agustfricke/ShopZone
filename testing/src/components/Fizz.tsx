import { useCartStore } from "../store/CartStore"

const Fizz = () => {

  const totalItems = useCartStore((state) => state.totalItems);


  return (
    <>
      <h1>Info Cart</h1>
      {totalItems}
    </>
  )
}

export default Fizz
