import axios from "axios";
import authApi from "./useAxios";


export const loginRequest = async (email: string, password: string) =>
  axios.post("http://127.0.0.1:8000/users/login/", {
    email,
    password,
  });


export const getUser = async () => {
  const res = await authApi.get('/users/me/')
  return res.data
}
