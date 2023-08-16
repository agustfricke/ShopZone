import { Outlet, Navigate } from "react-router-dom";
import { useAuthStore } from "../store/auth";
import { Token } from "../Interfaces";
import jwt_decode from "jwt-decode"

export const PrivateRoute = () => {
    const { isAuth } = useAuthStore();
    return (
        isAuth ? <Outlet /> : <Navigate to='/login' />   
    );
};

export const AdminPrivateRoute = () => {
    const token: string = useAuthStore.getState().access;
    const tokenDecoded: Token = jwt_decode(token)
    const isAdmin = (tokenDecoded.is_staff);  
    return (
        isAdmin ? <Outlet /> : <Navigate to='/' />   
    );
};

