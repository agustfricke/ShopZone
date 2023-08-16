import { useParams } from "react-router-dom";
import { solo_order } from "../api/orders";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import Loader from "../components/Loader";

const SoloOrder = () => {
    const { id } = useParams();

    let new_id: number;

    if (id !== undefined) {
        new_id = Number(id);
    }

    const { data, isError, isLoading } = useQuery({
        queryKey: ["orders"],
        queryFn: () => solo_order(new_id),
    });


    if (isError) return toast.error("Error!");
    if (isLoading) return <Loader />;

    return (
        <div className="overflow-x-auto container mx-auto px-4 pt-11">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-4 py-3">
                            Total Price
                        </th>
                        <th scope="col" className="px-4 py-3">
                            Entregado
                        </th>

                        <th scope="col" className="px-4 py-3">
                            Created at
                        </th>

                        <th scope="col" className="px-4 py-3">
                            Delivered at
                        </th>

                        <th scope="col" className="px-4 py-3">
                            City
                        </th>

                        <th scope="col" className="px-4 py-3">
                            Address
                        </th>

                        <th scope="col" className="px-4 py-3">
                            Zip code
                        </th>
                    </tr>
                </thead>

                <tbody>
                    <tr className="border-b dark:border-gray-700">
                        <th
                            scope="row"
                            className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                            $ {data.total_price}
                        </th>

                        <td className="px-4 py-3">
                            {data.is_delivered === false || null ? (
                                <p>No entregado</p>
                            ) : (
                                <p>entregado</p>
                            )}
                        </td>

                        <td className="px-4 py-3">
                            {data && data.created_at !== undefined || null && (
                                <>{data.created_at.slice(0, 10)}</>
                            )}
                        </td>

                        <td className="px-4 py-3">
                            {data && data.delivered_at !== undefined || null && (
                                <>{data.delivered_at.slice(0, 10)}</>
                            )}
                        </td>

                        <td className="px-4 py-3">
                            <div className="flex justify-center gap-4">
                            {data && data.shipping_address !== undefined && (
                                <>
                                {data.shipping_address.city}
                                </>
                                )}
                            </div>
                        </td>

                        <td className="px-4 py-3">
                            <div className="flex justify-center gap-4">

                            {data && data.shipping_address !== undefined && (
                            <>
                                {data.shipping_address.address}
                                </>
                                )}
                            </div>
                        </td>

                        <td className="px-4 py-3">
                            <div className="flex justify-center gap-4">

                            {data && data.shipping_address !== undefined && (
                            <>
                                {data.shipping_address.postal_code}
                                </>
                                )}
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>

            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 mt-11 ">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-4 py-3">
                            Product
                        </th>
                        <th scope="col" className="px-4 py-3">
                            Quantity
                        </th>

                        <th scope="col" className="px-4 py-3">
                            Price
                        </th>
                    </tr>
                </thead>

            
                <tbody>
                {data.order_items && data.order_items.map((p: any) => (
                    
                    <tr className="border-b dark:border-gray-700">
                        <th
                            scope="row"
                            className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                            {p.product}
                        </th>

                        <td className="px-4 py-3">
                            {p.quantity}
                        </td>

                        <td className="px-4 py-3">
                            $ {p.price}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};
export default SoloOrder;
