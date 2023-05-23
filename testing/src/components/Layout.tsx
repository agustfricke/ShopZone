import { Link, Outlet, useNavigate } from "react-router-dom"
import { useAuthStore } from "../store";


const Layout = () => {

  const nav = useNavigate()

function logoutbb () {
  useAuthStore.getState().logout()
  nav('/')
}

  const { isAuth } = useAuthStore()
  console.log(isAuth)

  return (

    <div>
      { isAuth ? (
        <>
    <button onClick={logoutbb}>Logout</button>
      <Link to={'/foo'}>Foo</Link>
      <Link to={''}>Home</Link>
      </>
      ) : (
          <>
      <Link to={'/login'}>Login</Link>
      <Link to={''}>Home</Link>
      </>
      )}
      <Outlet />
    </div>

  )
}

export default Layout
