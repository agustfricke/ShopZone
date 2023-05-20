import { authApi, axi } from "./useAxios";

export const registerRequest = async (email: string, username: string, password: string) => {
  axi.post("/users/register/", {email, username, password});
}

export const loginRequest = async (email: string, password: string) => {
  const response = axi.post("/users/login/", {email, password});
  return response;
}

export const getUsersRequest = async () => {
  const res = await authApi.get('/users/users/')
  return res.data
}
