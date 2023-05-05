import React, { useState, ChangeEvent } from 'react';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addProd } from "../api/Products";


const FileInput = () => {

  const [textValue, setTextValue] = useState<string>('');
  const [price, setPriceValue] = useState<string>('');
  const [fileValue, setFileValue] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string>('');

  const queryClient = useQueryClient();

  const addProdMutation = useMutation({
    mutationFn: addProd,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["prod"] });
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
      addProdMutation.mutate({ name: textValue, image: fileValue, price: price});

  };

  const handleTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTextValue(event.target.value);
  };

  const handlePriceChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPriceValue(event.target.value);
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

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={textValue} onChange={handleTextChange} />
      <input type="text" value={price} onChange={handlePriceChange} />
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
  );
};

export default FileInput;
