import { authApi, axi } from "./useAxios"

interface FormData {
  name: string;
  image: string;
}

export const addProd = async (data: FormData) => {
  await authApi.post('products/', data, {headers: {'Content-Type': 'multipart/form-data'}})
}
export const getProd = async () => {
  const res = await axi.get('products/')
  return res.data
}
