import { BsFillTrashFill } from "react-icons/bs";
import { AiFillEdit } from "react-icons/ai";


const AdminOrders = () => {

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-4 py-3">Order ID</th>
            <th scope="col" className="px-4 py-3">Email</th>
            <th scope="col" className="px-4 py-3">Username</th>
            <th scope="col" className="px-4 py-3">Actions</th>
          </tr>
        </thead>

        <tbody>
            <tr className="border-b dark:border-gray-700">
              <th scope="row" className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">sdsd</th>
              <td className="px-4 py-3">sdsdsd</td>
              <td className="px-4 py-3">sdsdsd</td>
              <td className="px-4 py-3 flex items-center justify-center gap-4">
                <BsFillTrashFill size={22} 
                  className="text-red-300 cursor-pointer"/>
                <AiFillEdit size={22} className="text-green-300 cursor-pointer"/>
              </td>
            </tr>
        </tbody>
      </table>
    </div>
  )
}

export default AdminOrders
