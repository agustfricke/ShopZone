import { BrowserRouter, Routes, Route } from "react-router-dom"
import Layout from "./components/Layout"
import { PrivateRoute, AdminRoute } from "./components/PrivateRoute"

import LandingPage from "./pages/LandingPage"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import Home from "./pages/Home"

import AdminPage from "./pages/AdminPage"


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout/>}>

          <Route element={<PrivateRoute/>}>
            <Route index element={<Home/>} />
          </Route>

          <Route path='admin' element={<AdminRoute/>}>
            <Route index element={<AdminPage/>} />
          </Route>

          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route index element={<LandingPage />} />

        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
