import { useParams } from "react-router-dom"
import { getProduct } from "../api/products"
import { useQuery } from "@tanstack/react-query"

const SoloProduct = () => {

  const { data } = useQuery({
    queryFn: () => getProduct(name),
    queryKey: ['product', name]
  })

  return (
    <>
    </>
  )
}

export default SoloProduct
