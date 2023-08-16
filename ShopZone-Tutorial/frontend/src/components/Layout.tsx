import { Outlet } from 'react-router-dom';
import Header from './Header';
import { Toaster } from 'react-hot-toast';
// new
import { useSearchStore } from '../store/search';

const Layout = () => {

    // const searchTerm = useSearchStore((state) => state.searchTerm);

    /*
    if (searchTerm !== '') {
        // mostra los resultados haciendo un get request de los cursos 
    }
    */

  return (
      <div>
          <Toaster />
          <Header />
        <div className="min-h-[1000px] bg-white dark:bg-gray-900">
          <Outlet />
        </div>
      </div>
  )
}

export default Layout
