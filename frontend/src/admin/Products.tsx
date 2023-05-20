import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from 'react-intersection-observer'
import { useEffect } from 'react';
import { getProducts } from "../api/products";
import Loader from "../components/Loader"
import  toast from "react-hot-toast"
import { BsFillTrashFill } from "react-icons/bs";
import { AiFillEdit } from "react-icons/ai";
import { Product } from "../Interfaces";


const Products = () => {

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
    <div className="overflow-x-auto">
      <table className="w-[1000px] text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-4 py-3">Image</th>
            <th scope="col" className="px-4 py-3">Product Name</th>
            <th scope="col" className="px-4 py-3">Descripton</th>
            <th scope="col" className="px-4 py-3">Price</th>
            <th scope="col" className="px-4 py-3">Rating</th>
            <th scope="col" className="px-4 py-3">Num Reviews</th>
            <th scope="col" className="px-4 py-3">Stock</th>
            <th scope="col" className="px-4 py-3">Category</th>
          </tr>
        </thead>

        <tbody>
        {data?.pages.map((page: any) => (
          <>
            <div key={page.meta.page}>
              {page.data.map((product: Product)=> (
            <tr className="border-b dark:border-gray-700">
              <img
                className="h-8 w-8 rounded-full"
                src={`http://127.0.0.1:8000${product.image}`}
                alt={product.name}
              />
              <td className="px-4 py-3">{product.name}</td>
              <td className="px-4 py-3">{product.description.substring(0, 10)}</td>
              <td className="px-4 py-3">{product.price}</td>
              <td className="px-4 py-3">{product.rating}</td>
              <td className="px-4 py-3">{product.num_reviews}</td>
              <td className="px-4 py-3">{product.stock}</td>
              <td className="px-4 py-3">{product.category}</td>
              <td className="px-4 py-3 flex items-center justify-center gap-4">
                <BsFillTrashFill size={22} 
                  className="text-red-300 cursor-pointer"/>
                <AiFillEdit size={22} className="text-green-300 cursor-pointer"/>
              </td>
            </tr>
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
        </tbody>
      </table>
    </div>
  )
}

export default Products
