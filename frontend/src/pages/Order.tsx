import { useCartStore } from "../store/cart"


const Order = () => {

    const removeFromCart = useCartStore(state => state.removeFromCart)
  const addToCart = useCartStore(state => state.addToCart)
        const cart = useCartStore(state => state.cart);
    const total_price = useCartStore(state => state.totalPrice);

    /* Expected data to create order
    const order = {
        total_price: total_price,
             address: 'Balcon',
             city: 'Cordoba',
             country: 'Argentina',
             postal_code: '5000',
             shipping_price: '12',
             order_items: cart,
             // order_items: [
             //   {id: 9, name: 'Golang', quantity: 1, price: 12},
             //   {id: 10, name: 'test', quantity: 2, price: 10},
             // ]
    }
    */

    return (
            <>
            <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5">
            <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
            <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">


            <div className="relative mt-5 overflow-hidden bg-white shadow-md dark:bg-gray-800 sm:rounded-lg">
            <div className="flex flex-col px-4 py-3 space-y-3 lg:flex-row lg:items-center lg:justify-between lg:space-y-0 lg:space-x-4">
            <div className="flex items-center flex-1 space-x-4">
            <h5>
            <span className="text-gray-300 text-xl font-bold">Products in you cart: {cart.length}</span>
            </h5>
            <h5>
            <span className="text-gray-300 text-xl font-bold">
            Total: {total_price === null && '0'} {total_price}
            </span>
            </h5>
            </div>
            </div>
            <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
            <th scope="col" className="px-4 py-3">Product</th>
            <th scope="col" className="px-4 py-3">Category</th>
            <th scope="col" className="px-4 py-3">Quantity</th>
            <th scope="col" className="px-4 py-3">Price</th>
            <th scope="col" className="px-4 py-3">Total</th>
            </tr>
            </thead>
            <tbody>


            {cart.map(product => (
                        <>

                        <tr key={product.id} className="border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">
                        <th scope="row" className="flex items-center px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        <img src={`http://127.0.0.1:8000${product.image}`} alt={product.name} className="w-auto h-8 mr-3"/>

                        {product.name}
                        </th>
                        <td className="px-4 py-2">
                        <span className="bg-primary-100 text-primary-800 text-xs font-medium px-2 py-0.5 rounded dark:bg-primary-900 dark:text-primary-300">
                        {product.category}
                        </span>
                        </td>
                        <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        <div className="flex items-center space-x-3">
                        <button 
                        onClick={() => removeFromCart(product)}
                        className="inline-flex items-center p-1 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                            <span className="sr-only">Quantity button</span>
                            <svg className="w-4 h-4" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
                        </button>
                        <div>
                        {product.quantity}
                            <input type="number" id="first_product" className="hidden bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="1" required/>
                        </div>
                        <button 
                        onClick={() => addToCart(product)}
                        className="inline-flex items-center p-1 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                            <span className="sr-only">Quantity button</span>
                            <svg className="w-4 h-4" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
                        </button>
                    </div>
                        </td>
                        <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">${product.price}</td>

                        <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">${product.price}</td>

                </tr>

                </>
                ))}

    </tbody>
        </table>
        </div>
        </div>



        </div>
        </div>
        </section>

        </>
        )

}

export default Order;
