import { BrowserRouter , Routes, Route } from 'react-router-dom'
import LoginPage from './components/LoginPage'
import Foo from './components/Foo'
import Layout from './components/Layout'
import PrivateRoute from './components/PrivateRoute'
import Home from './components/Home'
import FileInput from './components/FileInput'
import SoloProd from './components/SoloProd'

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path='/' element={<Layout/>}>

        <Route element={<PrivateRoute/>}>
          <Route path="/foo" element={<Foo/>} />
          <Route path="/add" element={<FileInput/>} />
          <Route path=":id" element={<SoloProd/>} />
        </Route>

          <Route path='/login' element={<LoginPage />} />
          <Route index element={<Home/>} />

        </Route>

      </Routes>
    </BrowserRouter>
  )
}
export default App
