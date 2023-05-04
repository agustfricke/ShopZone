import {  useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { getProd, deleteReq } from "../api/Products"
import { useInView } from 'react-intersection-observer'
import { useEffect } from "react"
import { Cstore } from "../cStore"

const Home = () => {

interface Prod {
  id: string
  name: string
}

  const { add, remove } = Cstore()

  const { ref, inView } = useInView()

  const queryClient = useQueryClient()

  const { data,isLoading, error, isFetchingNextPage, fetchNextPage, hasNextPage } = useInfiniteQuery(
    ['prods'],
    getProd,
    {
      getNextPageParam: lastPage => lastPage.meta.next,
    }
  );

  const deleteProdMutation = useMutation({
    mutationFn: deleteReq,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['prods']})
    },
    onError: (error) => {
      console.error(error)
    }
  })

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

            <div key={t.id}>
              <h2>{t.name}</h2>
              <button onClick={() => deleteProdMutation.mutate(t.id)}>Delete</button>
              <button onClick={() => {
          add(t.id);
      }}>Add Prod</button>
              <button onClick={() => {
          remove(t.id);
      }}>Remove Prod</button>

            </div>

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
