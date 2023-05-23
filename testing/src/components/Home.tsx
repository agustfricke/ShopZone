import {  useInfiniteQuery } from "@tanstack/react-query"
import { getProd } from "../api/Products"
import { useInView } from 'react-intersection-observer'
import { useEffect } from "react"
import ProductCard from "./ProductCard"
import { Product } from "../types"


const Home = () => {

interface Prod {
  product: Product
}


  const { ref, inView } = useInView()

  const { data,isLoading, error, isFetchingNextPage, fetchNextPage, hasNextPage } = useInfiniteQuery(
    ['prods'],
    getProd,
    {
      getNextPageParam: lastPage => lastPage.meta.next,
    }
  );
  console.log(data)

  useEffect(() => {
    if (inView) {
      fetchNextPage()
    }
  }, [inView])

  if(isLoading) return <div>Loading...</div>
  if(error instanceof Error ) return <div>Error: {error.message}</div>
  

  return (
  <>
      {data?.pages.map(page => (

        <div key={page.meta.page}>

          {page.data.map((t: Prod) => (

					<ProductCard key={t.id} product={t} />

          ))}

         {isLoading && <p>Loading...</p>}
      <p>{data.pages.length}</p>
      {!isLoading && data.pages.length === 0 && <p>No results</p>}
      {!isLoading && data.pages.length  > 0 && hasNextPage && (
        <button ref={ref} onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
          {isLoading || isFetchingNextPage ? "Loading..." : "Load more"}
        </button>
      )}

        </div>

          ))}


  </>
  )
}

export default Home
