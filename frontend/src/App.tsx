import { BrowserRouter , Routes, Route } from 'react-router-dom'
import LoginPage from './components/LoginPage'
import Foo from './components/Foo'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/foo" element={<Foo/>} />
      </Routes>
    </BrowserRouter>
  )
}
export default App
