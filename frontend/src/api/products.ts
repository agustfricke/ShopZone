import { authApi, axi } from "./useAxios"
import { Product } from "../Interfaces"

export const searchProducts = async (name: string) => {
  const res = await axi.get(`products/search/?query=${name}`)
  return res.data
}

export const deleteProduct = async (id: string) => {
  await authApi.delete(`products/${id}/`)
}

export const getProduct = async (id: string) => {
  const res = await axi.get(`products/${id}`)
  return res.data
}

export const putProduct = async (data: Product) => {
  const formData = new FormData();
  formData.append("name", data.name);
  formData.append("description", data.description);
  formData.append("stock", data.count_in_stock.toString());
  formData.append("category", data.category);
  formData.append("price", data.price.toString());
  if (data.image) {
    formData.append("image", data.image.toString());
  }
  await authApi.put(`products/${data.id}/`, formData);
}

export const postProduct = async (data: Product) => {
  const formData = new FormData();
  formData.append("name", data.name);
  formData.append("description", data.description);
  formData.append("stock", data.count_in_stock.toString());
  formData.append("category", data.category);
  formData.append("price", data.price.toString());
  if (data.image) {
    formData.append("image", data.image);
  }
  await authApi.post('products/create/', formData);
}

export const getProducts = async ({ pageParam = 1 }) => {
  const response = await axi.get(`/products/?page=${pageParam}&pages=10`);
  return response.data;
}

