import { Product } from "../Interfaces"
import { Link } from "react-router-dom"

interface Props {
  product: Product
  page: string
}

const ProductCard = ({ product, page }: Props) => {
  return (
    <div className="h-96 
      dark:bg-[#263849] p-8 
      rounded-xl flex flex-col 
      items-center gap-2 text-center bg-slate-400">
      <img
        src={`${product.image}`}
        className="w-60 h-60 object-cover -mt-20 shadow-2xl rounded-lg"
      />
      <p className="text-xl dark:text-slate-200 text-gray-950 font-bold">{product.name}</p>
      <span className="dark:text-slate-300 text-black">{product.description}</span>
      <span className="dark:text-white text-black">${product.price}</span>

      <Link className="dark:text-white 
        dark:hover:text-yellow-300 
        font-mono" 
        to={`/reviews/${product.id}/`}>
        {`${product.num_reviews} reviews`}
      </Link>

      <Link to={`/product/${product.name}`}>
        <div className='flex space-x-2 
          items-center dark:text-slate-200 
          dark:bg-gray-950 dark:hover:bg-slate-900 
          font-bold rounded-lg p-2 px-10 bg-gray-600 text-slate-200 hover:bg-gray-700'>
          {page === 'solo' ? 'Add to Cart' : 'View'}
        </div>
      </Link>
    </div>
  )
}
export default ProductCard
