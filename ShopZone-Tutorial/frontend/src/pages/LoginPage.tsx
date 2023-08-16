import Logo from '../assets/cart.png'
import { Link, useNavigate, Navigate } from 'react-router-dom'
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from '../store/auth';
import { loginRequest } from '../api/users';
import Loader from '../components/Loader';
import { toast } from 'react-hot-toast';

const LoginPage = () => {

        const navigate = useNavigate();
  const setToken = useAuthStore((state) => state.setToken);
  const { isAuth } = useAuthStore()

  if(isAuth) return (<Navigate to='/'/>)  

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const loginMutation = useMutation({
    mutationFn:() => loginRequest(email, password), 
    onSuccess: (response) => {
      console.log(response)
      setToken(response.data.access, response.data.refresh);
      navigate("/");
    },
    onError: (error) => {
      if (typeof error === 'string') {
        toast.error(error);
      } else {
        toast.error('An error occurred');
      }
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    loginMutation.mutate();
  };
  

  if(loginMutation.isLoading) return <Loader/>

  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-[600px] lg:py-0">
      <Link to="/" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
        <img className="w-8 h-8 mr-2" src={Logo} alt="logo"/>
        <span>Shop Zone</span>
      </Link>
        <div className="w-full md:w-[400px] lg:w-[500px] bg-slate-300 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Sign in to your account
          </h1>
          <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
              <input type="email" name="email" id="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com"/>
            </div>
            <div>
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
              <input type="password" name="password" id="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}

                placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
            </div>
            <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
              Don’t have an account yet? <Link to={'/register'} className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}
export default LoginPage
