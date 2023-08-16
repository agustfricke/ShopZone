import { BsFillTrashFill } from "react-icons/bs";
import { AiFillEdit, AiFillPlusSquare } from "react-icons/ai";
import { Link } from "react-router-dom";
import { delete_product, get_products } from "../api/products";
import {
    useMutation,
    useQueryClient,
    useInfiniteQuery,
} from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import Loader from "./Loader";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { Product } from "../Interfaces";

interface Props {
    results: any;
}

const Products = ({ results }: Props) => {
    const { ref, inView } = useInView();

    useEffect(() => {
        if (inView) {
            fetchNextPage();
        }
    }, [inView]);

    const {
        data,
        isLoading,
        error,
        isFetchingNextPage,
        fetchNextPage,
        hasNextPage,
    } = useInfiniteQuery(["products"], get_products, {
        getNextPageParam: (page: any) => page.meta.next,
    });

    const queryClient = useQueryClient();

    const deleteProdMutation = useMutation({
        mutationFn: delete_product,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["products"] });
            toast.success("Product deleted!");
        },
        onError: () => {
            toast.error("Error!");
        },
    });

    if (deleteProdMutation.isLoading) return <Loader />;
    if (error instanceof Error) return <>{toast.error(error.message)}</>;

    return (
        <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-4 py-3">
                            Product ID
                        </th>
                        <th scope="col" className="px-4 py-3">
                            Name
                        </th>

                        <th scope="col" className="px-4 py-3">
                            Price
                        </th>

                        <th scope="col" className="px-4 py-3">
                            Count in stock
                        </th>

                        <th
                            scope="col"
                            className="px-4 py-3 flex justify-center gap-4"
                        >
                            Actions
                            <Link to="add">
                                <AiFillPlusSquare
                                    size={22}
                                    className="text-green-300 cursor-pointer"
                                />
                            </Link>
                        </th>
                    </tr>
                </thead>

                {results && results.products.length > 0 ? (
                    <>
                        {results &&
                            results.products.map((product: Product) => (
                                <tbody>
                                    <tr className="border-b dark:border-gray-700">
                                        <th
                                            scope="row"
                                            className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                        >
                                            {product.id}
                                        </th>

                                        <td className="px-4 py-3">
                                            {product.name}
                                        </td>

                                        <td className="px-4 py-3">
                                            $ {product.price}
                                        </td>

                                        <td className="px-4 py-3">
                                            {product.count_in_stock}
                                        </td>

                                        <td className="px-4 py-3">
                                            <div className="flex justify-center gap-4">
                                                <BsFillTrashFill
                                                    onClick={() => {
                                                        if (
                                                            product.id !==
                                                            undefined
                                                        ) {
                                                            deleteProdMutation.mutate(
                                                                product.id
                                                            );
                                                        }
                                                    }}
                                                    size={22}
                                                    className="text-red-300 cursor-pointer"
                                                />

                                                <Link to={`edit/${product.id}`}>
                                                    <AiFillEdit
                                                        size={22}
                                                        className="text-white cursor-pointer"
                                                    />
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            ))}
                    </>
                ) : (
                    <>
                        {data?.pages.map((page: any) => (
                            <>
                                <tbody key={page.meta.next}>
                                    {page.data.map((product: Product) => (
                                        <tr className="border-b dark:border-gray-700">
                                            <th
                                                scope="row"
                                                className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                            >
                                                {product.id}
                                            </th>

                                            <td className="px-4 py-3">
                                                {product.name}
                                            </td>

                                            <td className="px-4 py-3">
                                                $ {product.price}
                                            </td>

                                            <td className="px-4 py-3">
                                                {product.count_in_stock}
                                            </td>

                                            <td className="px-4 py-3">
                                                <div className="flex justify-center gap-4">
                                                    <BsFillTrashFill
                                                        onClick={() => {
                                                            if (
                                                                product.id !==
                                                                undefined
                                                            ) {
                                                                deleteProdMutation.mutate(
                                                                    product.id
                                                                );
                                                            }
                                                        }}
                                                        size={22}
                                                        className="text-red-300 cursor-pointer"
                                                    />

                                                    <Link
                                                        to={`edit/${product.id}`}
                                                    >
                                                        <AiFillEdit
                                                            size={22}
                                                            className="text-white cursor-pointer"
                                                        />
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>

                                {!isLoading && data?.pages.length === 0 && (
                                    <p className="text-xl text-slate-800 dark:text-slate-200">
                                        No more results
                                    </p>
                                )}
                                {!isLoading &&
                                    data?.pages?.length !== undefined &&
                                    data.pages.length > 0 &&
                                    hasNextPage && (
                                        <div ref={ref}>
                                            {isLoading || isFetchingNextPage ? (
                                                <Loader />
                                            ) : null}
                                        </div>
                                    )}
                            </>
                        ))}
                    </>
                )}
            </table>
        </div>
    );
};
export default Products;
