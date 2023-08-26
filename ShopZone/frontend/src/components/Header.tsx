import { BsFillMoonStarsFill, BsFillSunFill } from "react-icons/bs";
import { useDarkMode } from "../store/theme";
import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { HiOutlineShoppingBag } from "react-icons/hi";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/auth";
import jwt_decode from "jwt-decode"
import { useCartStore } from "../store/cart"
import { Token } from "../Interfaces";
import { useSearchStore } from "../store/search";

const Header = () => {

  const { toggleDarkMode, darkMode } = useDarkMode();
  const token: string = useAuthStore.getState().access;
  const { isAuth } = useAuthStore()
    const cart = useCartStore(state => state.cart);

    let is_admin: boolean;
    let user_id: number;
    let avatar: string;

  if(isAuth) {
    const tokenDecoded: Token = jwt_decode(token)
    is_admin = tokenDecoded.is_staff;
    user_id = tokenDecoded.user_id;
    avatar = String(tokenDecoded.avatar)
  } 

  const setSearchTerm = useSearchStore((state) => state.setSearchTerm);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }


  function logOutFun() {
    useAuthStore.getState().logout()
    window.location.href = '/login'
  }

  function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ')
  }

  return (
    <Disclosure as="nav" className="bg-grey dark:bg-gray-800">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">

                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-600 hover:text-gray-900 dark:text-slate-200 dark:hover:text-slate-50">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">

                  <img
                    className="hidden h-8 w-auto lg:block"
                    src="/public/logo.png"
                    alt="Logo"
                  />
                </div>


                <div className="hidden sm:ml-6 sm:block">

                  <div className="flex space-x-4">

                    {isAuth ? (
                      <>
                        <Link
                          to={'/'}
                          className='bg-slate-400 p-2 px-4 rounded-lg text-black dark:bg-gray-900 dark:text-white' 
                        >
                          Home
                        </Link>

                        <Link
                          to={'/cate'}
                          className='text-black p-2 px-4 rounded-lg hover:bg-slate-400 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white'
                        >
                          Categories
                        </Link>
                      </>

                    ) : (
                        <>
                          <Link
                            to={'/login'}
                            className='bg-slate-400 p-2 px-4 rounded-lg text-black dark:bg-gray-900 dark:text-white' 
                          >
                            Log in
                          </Link>

                          <Link
                            to={'/register'}
                            className='text-black p-2 px-4 rounded-lg hover:bg-slate-400 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white'
                          >
                            Sign up
                          </Link>
                        </>
                      )}

                    {is_admin && is_admin && (
                      <Link
                        to={'/admin'}
                        className='text-black p-2 px-4 rounded-lg hover:bg-slate-400 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white'
                      >
                        Admin Panel
                      </Link>
                    )}


                  </div>

                </div>
              </div>

              <div className="relative hidden md:block">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-500" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
                  <span className="sr-only">Search icon</span>
                </div>
                <input 
                type="text" 
                onChange={handleInputChange}
                className="block w-full md:w-[200px] lg:w-[400px] xl:w-[600px] p-2
                  pl-10 text-sm text-gray-900 border border-gray-300 rounded-full 
                  bg-gray-50 dark:bg-gray-700 outline-none
                  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
                  " placeholder="Search..."/>
              </div>

              <div className="absolute space-x-2 inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <button
                  onClick={toggleDarkMode}
                  type="button"
                >
                  {darkMode ? 

                    <BsFillMoonStarsFill size={20} className="text-slate-200 hover:text-white "/> 

                    : 

                    <BsFillSunFill size={23} className="text-slate-900 hover:text-black"/>}

                </button>

                <Link to={'/cart'} className="text-slate-900 hover:text-black dark:text-slate-200 dark:hover:text-white">
                  <HiOutlineShoppingBag size={23}/>
                </Link>
                <span className="text-slate-900 dark:text-slate-200">{cart.length}</span>

                {isAuth && (
                  <Menu as="div" className="relative ml-2">
                    <div>
                      <Menu.Button className="flex rounded-full ml-8 text-sm focus:outline-none ">
                        <span className="sr-only">Open user menu</span>
                        <img
                          className="h-8 w-8 rounded-full"
                            src={`${import.meta.env.VITE_BACKEND_URL}${avatar}`}
                          alt=""
                        />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right bg-white dark:bg-slate-950 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to="/profile"
                              className={classNames(active ? 'bg-gray-100 dark:bg-slate-700' : '', 'block px-4 py-2 text-sm text-gray-700 dark:text-slate-200')}
                            >
                              Your Profile
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <span
                              onClick={logOutFun}
                              className={classNames(active ? 'bg-gray-100 dark:bg-slate-700' : '', 'block px-4 py-2 text-sm text-gray-700 cursor-pointer dark:text-slate-200')}
                            >
                              Sign out
                            </span>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>

                )}

              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">


            <div className="flex mx-2">
              <div className="absolute inset-y-[72px] left-2 px-4 flex pl-3 pointer-events-none">
                <svg className="w-5 h-5 text-gray-500" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
                <span className="sr-only">Search icon</span>
              </div>
              <input type="text" id="search-navbar" className="block w-full p-2
                pl-10 text-sm text-gray-900 border border-gray-300 rounded-full 
                bg-gray-50 dark:bg-gray-700 outline-none
                dark:border-gray-600 dark:placeholder-gray-400 dark:text-white  
                " placeholder="Search..."/>
            </div>

            <div className="space-y-1 px-2 pb-3 pt-2">
              {isAuth ? (
                <div className="w-full grid grid-cols-1">
<Link
                    to={'/'}
                    className='bg-slate-400 p-2 px-4 rounded-lg text-black dark:bg-gray-900 dark:text-white' 
                  >
                    Home
                  </Link>

                  <Link
                    to={'/cate'}
                    className='text-black p-2 px-4 rounded-lg hover:bg-slate-400 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white'
                  >
                    Categories
                  </Link>
                </div>

              ) : (
                  <div className="w-full grid grid-cols-1">
                    <Link
                      to={'/login'}
                      className='bg-slate-400 p-2 px-4 rounded-lg text-black dark:bg-gray-900 dark:text-white' 
                    >
                      Log in
                    </Link>

                    <Link
                      to={'/register'}
                      className='text-black p-2 px-4 rounded-lg hover:bg-slate-400 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white'
                    >
Sign up
                    </Link>
</div>
                )}

              {is_admin  && (
                <div className="w-full">
                  <Link
                    to={'/'}
                    className='text-black p-2 px-4 rounded-lg hover:bg-slate-400 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white'
                  >
                    Admin Panel
                  </Link>
                </div>
              )}

            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}

export default Header
