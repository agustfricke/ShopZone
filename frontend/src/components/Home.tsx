import { useQuery } from "@tanstack/react-query"
import { getProd } from "../api/Products"

const Home = () => {

interface Prod {
  id: string
  name: string
}

  const { data, isLoading, error } = useQuery({
    queryKey: ['prod'],
    queryFn: getProd
  })

  if(isLoading) return <div>Loading...</div>
  if(error instanceof Error ) return <div>Error: {error.message}</div>
  
  console.log(data)

  return (
  <>
      {data?.map((prod: Prod)=> (
        <div key={prod.id}>{prod.name}</div>
      ))}
  </>
  )
}

export default Home
