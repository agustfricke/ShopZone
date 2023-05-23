import { useState } from "react"
import { q } from "../api/Products"
import { useQuery } from "@tanstack/react-query"

interface Prod {
  id: string
  name: string
}

function Result({ data, isLoading }: { data: Prod[]; isLoading: boolean }) {

  if (isLoading) return <div>Loading...</div>
  console.log(data)

  return (
    <div>
      {data?.map((product: any) => (
        <div key={product.id}>{product.name}</div>
      ))}
    </div>
  )
}

const Search = () => {

  const [search, setSearch] = useState('')
 
  const {data, isLoading } = useQuery({
    queryKey: ['search', search],
    queryFn: 
    () => {
    if (search) {
       return q(search)
    }
    return {products: []}
    }
  })

  return (
    <div>
      <input value={search} onChange={(e) => setSearch(e.target.value)} />
      {data?.products.length > 0 && <Result isLoading={isLoading} data={data.products} />}
    </div>
  )
}

export default Search
