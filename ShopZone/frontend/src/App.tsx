import { BrowserRouter, Routes, Route } from "react-router-dom"
import { PrivateRoute, AdminPrivateRoute } from "./components/PrivateRoute"
import Layout from "./components/Layout"

import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import SoloProduct from "./pages/SoloProduct"
import CatePage from "./pages/CatePage"

import AdminPage from "./pages/AdminPage"
import AddProductPage from "./pages/AddProductPage"
import EditProductPage from "./pages/EditProductPage"
import SearchByCate from "./pages/SearchByCate"
import CartPage from "./pages/CartPage"
import UserProfile from "./pages/UserProfile"
import SoloOrder from "./pages/SoloOrder"


function App() {

  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Layout />} >
                <Route path="login" element={<LoginPage />} />
                <Route path="register" element={<RegisterPage />} />

                <Route index element={<HomePage />} />
                <Route path="product/:slug" element={<SoloProduct />} />

                <Route path="cate" element={<CatePage />} />
                <Route path="cate/:cate" element={<SearchByCate />} />

                <Route element={<PrivateRoute />} >
                    <Route path="cart" element={<CartPage />} />
                    <Route path="profile" element={<UserProfile />} />
                    <Route path="order/:id" element={<SoloOrder />} />
                </Route>

                <Route path="admin" element={<AdminPrivateRoute />} >
                    <Route index element={<AdminPage />} />
                    <Route path="add" element={<AddProductPage />} />
                    <Route path="edit/:id" element={<EditProductPage />} />
                </Route>

            </Route>
        </Routes>
    </BrowserRouter>
  )
}

export default App
