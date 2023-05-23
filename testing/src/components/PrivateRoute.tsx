import { Outlet, Navigate } from 'react-router-dom';
import { useAuthStore } from "../store";

const PrivateRoute = () => {

  const { isAuth } = useAuthStore()

    return (
        isAuth ? <Outlet/> : <Navigate to='/login'/>
    )
}

export default PrivateRoute;
