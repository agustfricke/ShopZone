import { getProducts } from "../api/products";
import ProductCard from "../components/ProductCard"
import { Product } from "../Interfaces";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from 'react-intersection-observer'
import { useEffect } from 'react';
import Loader from "../components/Loader";
import toast from "react-hot-toast";


const Home = () => {

  const { ref, inView } = useInView()

  const { data, isLoading, error, isFetchingNextPage, fetchNextPage, hasNextPage } = useInfiniteQuery(
    ['products'],
    getProducts,
    {
      getNextPageParam: (lastPage: any ) => lastPage.meta.next
    }
  )

  useEffect(() => {
    if (inView) {
      fetchNextPage()
    }
  }, [inView])

  if (isLoading) return <Loader/>
  if(error instanceof Error) return <>{toast.error(error.message)}</>

  return (
    <>
    

      <div className="p-8 mt-[50px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">

        {data?.pages.map((page: any) => (

          <>

            <div key={page.meta.page}>
              {page.data.map((product: Product)=> (
                <ProductCard key={product.id} product={product} page={'home'}/>
              ))}
            </div>

          </>

        ))}

        {!isLoading && data?.pages.length === 0 && <p className="text-xl text-slate-800 dark:text-slate-200">No more results</p>}
        {!isLoading && data?.pages?.length !== undefined && data.pages.length > 0 && hasNextPage && (
          <div ref={ref}>
            {isLoading || isFetchingNextPage ? <Loader /> : null}
          </div>
        )}

      </div>

    </>
  )
}

export default Home
