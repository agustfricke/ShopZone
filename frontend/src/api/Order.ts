import { authApi } from "./useAxios";

export const createOrder = async (order: any) => {
  return await authApi.post("/order/add/", order);
}
