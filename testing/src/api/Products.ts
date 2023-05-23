import { authApi, axi } from "./useAxios"

// Eliminar esto y poner el Producto de types.ts
interface AddProdFormData {
  name: string;
  price: string;
  image: File | null;
}

interface EditProdFormData{
  name: string;
  image: File | null;
  id: string | null;
}

export const q = async (name: string ) => {
  const res = await axi.get(`products/search/?query=${name}`)
  return res.data
}

export const deleteReq = async (id: string) => {
  await authApi.delete(`products/${id}/`)
}

export const getReq = async (id: string) => {
  const res = await axi.get(`products/${id}`)
  return res.data
}

export const editReq = async (data: EditProdFormData) => {
  const formData = new FormData();
  formData.append("name", data.name);
  if (data.image) {
    formData.append("image", data.image);
  }
  await authApi.put(`products/${data.id}/`, formData);
}

export const addProd = async (data: AddProdFormData) => {
  const formData = new FormData();
  formData.append("name", data.name);
  formData.append("price", data.price);
  if (data.image) {
    formData.append("image", data.image);
  }
  await authApi.post('products/', formData);
}

export const getProd = async () => {
  const res = await axi.get('products/')
  return res.data
}
