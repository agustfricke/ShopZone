import { BrowserRouter , Routes, Route } from 'react-router-dom'
import LoginPage from './components/LoginPage'
import Foo from './components/Foo'
import Layout from './components/Layout'
import PrivateRoute from './components/PrivateRoute'

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path='/' element={<Layout/>}>

        <Route element={<PrivateRoute/>}>
          <Route path="/foo" element={<Foo/>} />
        </Route>

          <Route index element={<LoginPage />} />

        </Route>

      </Routes>
    </BrowserRouter>
  )
}
export default App
