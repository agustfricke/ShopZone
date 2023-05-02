import { BsImage } from "react-icons/bs";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";
import { useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { addProd } from "../api/Products";

const AddProduct = () => {
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

  interface Values {
    name: string;
    image?: File;
  }

  const formik = useFormik<Values>({
    initialValues: { name: "", image: undefined },
    onSubmit: (values: Values, { resetForm }) => {
      const { image, name } = values;
      const formData = new FormData();

      if (image) {
        formData.append("image", image);
      }
      formData.append("name", name);
      addProdMutation.mutate(formData);

      resetForm({ name: "", image: undefined });
    },
  });

interface SeeImageProps {
  file?: Blob;
}

const SeeImage = ({ file }: SeeImageProps) => {
  const [preview, setPreview] = useState<string>('');

  const handleClose = () => {
    setPreview('');
  };

  if (file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setPreview(reader.result as string);
    };

    return (
      <div className="flex justify-between p-5 bg-gray-800 rounded-lg">
        <div className="left-0 top-0">
          <button className="text-slate-400 hover:text-slate-200 transition-colors" onClick={handleClose}>
            <AiFillCloseCircle size={30} />
          </button>
        </div>
        <img src={preview} width={250} height={250} />
      </div>
    );
  }

  return null;
};

  return (
    <div
      className="
      border-b-[1px] 
      border-neutral-800 
      p-5 
      "
    >
      <form onSubmit={formik.handleSubmit}>
        <div
          className="
          flex 
          gap-3 
          w-full 
          border-b-[1px] 
          border-neutral-800 
          p-3
        "
        >
          <input
            type="text"
            name="name"
            onChange={formik.handleChange}
            value={formik.values.name}
            className="bg-transparent grow outline-none "
            placeholder="Product name"
          />
        </div>
        <div className="flex justify-between p-3">
          <div className="image-upload">
                <label htmlFor="file-input">

            {!formik.values.image && (
              <BsImage
                className="flex 
          text-neutral-500 
          cursor-pointer 
          transition 
          mt-3
          hover:text-sky-500"
                size={20}
              />
            )}
                </label>


            <input
              className="hidden"
              type="file"
              name="image"
              onChange={(event) =>
                formik.setFieldValue("image", event.currentTarget.files?.[0])
              }
              id="file-input"
            />
          </div>
        </div>


        <div className="flex justify-end">

        <button type='submit' className="bg-sky-400 hover:bg-sky-500 p-2 px-5 rounded-full text-white font-bold">
            Create
        </button>
          </div>
</form>

        <div className="flex justify-center items-center">
          {formik.values.image && <SeeImage file={formik.values.image} />}
        </div>

    </div>

  )
}

export default AddProduct
