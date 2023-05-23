import { useQuery } from "@tanstack/react-query";
import { getReq } from "../api/Products";
import { useParams } from 'react-router-dom';
import EditProd from "./EditProd";


const SoloProd = () => {

  const { id } = useParams<{id: string | undefined }>()

  const { data, isLoading, error } = useQuery(['solP', id], () => getReq(String(id)))

  if (isLoading) return <div>Loading</div>
  if (error instanceof Error ) return <div>Error: {error.message}</div>

  return (
    <>
      {data?.name}
        <EditProd id={data?.id} name={data?.name} />
    </>
  );
};

export default SoloProd
