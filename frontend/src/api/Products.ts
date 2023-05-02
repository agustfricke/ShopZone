import { authApi, axi } from "./useAxios"

interface AddProdFormData {
  name: string;
  image: File | null;
}

export const addProd = async (data: AddProdFormData) => {
  const formData = new FormData();
  formData.append("name", data.name);
  if (data.image) {
    formData.append("image", data.image);
  }
  await authApi.post('products/', formData);
}

// export const addProd = async (data:any) => {
//   await authApi.post('products/', data) 
// }

export const getProd = async () => {
  const res = await axi.get('products/')
  return res.data
}
