import React, { useState, ChangeEvent } from 'react';
import { useQuery, useQueryClient, useMutation  } from "@tanstack/react-query";
import { getReq, editReq } from "../api/Products";


interface Props {
  id: string
  name: string
}

const EditProd = ({ id, name }: Props) => {

  // const { id } = useParams<{id: string | undefined }>()

  const { data, isLoading, error } = useQuery(['solP', id], () => getReq(String(id)))

  const [textValue, setTextValue] = useState<string>(name);
  const [fileValue, setFileValue] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string>('');

  console.log(data)

  const queryClient = useQueryClient();

  const addProdMutation = useMutation({
    mutationFn: editReq,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["prod"] });
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
      addProdMutation.mutate({ name: textValue, image: fileValue, id: id});

  };

  const handleTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTextValue(event.target.value);
  };

const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
  const file = event.target.files && event.target.files[0];
  if (file) {
    setFileValue(file);
    const reader = new FileReader();
    reader.onload = () => {
      setFilePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  }
};

  if (isLoading) return <div>Loading</div>
  if (error instanceof Error ) return <div>Error: {error.message}</div>

  return (
    <>
    <form onSubmit={handleSubmit}>
      <input type="text" value={textValue} onChange={handleTextChange} />
      <input type="file" onChange={handleFileChange} />
      {fileValue && (
        <img
          className='h-48 w-96'
          src={filePreview}
          alt="Imagen seleccionada"
        />
      )}
      <button>Submit</button>
    </form>
    </>
  );
};

export default EditProd;
