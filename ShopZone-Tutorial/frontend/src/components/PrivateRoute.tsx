import { Outlet, Navigate } from 'react-router-dom';
import { useAuthStore } from "../store/auth";

export const PrivateRoute = () => {

  const { isAuth } = useAuthStore()

    return (
        isAuth ? <Outlet/> : <Navigate to='/login'/>
    )
}

export const AdminRoute = () => {
  const isAdmin = true 
  return (
    isAdmin ? <Outlet/> : <Navigate to='/'/>
  )
}
