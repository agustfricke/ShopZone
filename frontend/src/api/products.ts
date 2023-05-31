import { authApi, axi } from "./useAxios"
import { Product } from "../Interfaces"

export const searchProducts = async (name: string) => {
  const res = await axi.get(`products/search/?query=${name}`)
  return res.data
}

export const deleteProduct = async (id: string) => {
  await authApi.delete(`products/${id}/`)
}

export const getProduct = async (name: string | undefined) => {
  if (!name) {
    throw new Error('No product found with that name.'); 
  }
  const res = await axi.get(`products/get/${name}`)
  return res.data
}

export const putProduct = async (data: Product) => {
  const formData = new FormData();
  formData.append("name", data.name);
  formData.append("description", data.description);
  formData.append("stock", data.count_in_stock.toString());
  formData.append("category", data.category);
  formData.append("price", data.price.toString());
  if (data.image && typeof data.image !== "string") {
    formData.append("image", data.image);
  }
  await authApi.put(`products/update/${data.id}/`, formData);
}

export const postProduct = async (data: Product) => {
  const formData = new FormData();
  formData.append("name", data.name);
  formData.append("description", data.description);
  formData.append("count_in_stock", data.count_in_stock.toString());
  formData.append("category", data.category);
  formData.append("price", data.price.toString());
  if (data.image) {
    formData.append("image", data.image);
  }
  await authApi.post('products/create/', formData);
}


export const getProducts = async ({ pageParam = 1 }) => {
  const response = await axi.get(`/products/?page=${pageParam}&pages=9`);
  return response.data;
}

