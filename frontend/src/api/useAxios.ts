import axios from "axios";
import { useAuthStore } from "../store";
import jwt_decode from "jwt-decode"

function logoutbb () {
  console.log('Bye bye aca pongo el logout')
  useAuthStore.getState().logout()
}


const baseURL = "http://127.0.0.1:8000";

const authApi = axios.create({
  baseURL,
  withCredentials: true,
});


authApi.interceptors.request.use( async (config) => {

  const token = useAuthStore.getState().access;

  config.headers = {
    Authorization: `Bearer ${token}`,
  };


  const tokenDecoded = jwt_decode(token)
  console.log(tokenDecoded)
  console.log(token)

  const expiration = new Date(tokenDecoded.exp);
  const now = new Date();
  const fiveMinutes = 1000 * 60 * 5;

  if( expiration.getTime() - now.getTime() < fiveMinutes ){

    try {
    const res = await axios.post('http://127.0.0.1:8000/users/refresh/', { refresh: useAuthStore.getState().refresh })
    console.log('Manando token ', useAuthStore.getState().refresh)
    useAuthStore.getState().setToken(res.data.access, res.data.refresh)

    } catch (err: any ) {
      if (err.response.status == 401) {
        console.log('Foooo')
        logoutbb()
      }
    }
} else {
    console.log("JWT is valid for more than 5 minutes", expiration);
    return config
}

  return config;
});

export default authApi;
