import { get_products } from "../api/products";
import ProductCard from "../components/ProductCard";
import { Product } from "../Interfaces";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import Loader from "../components/Loader";
import toast from "react-hot-toast";
import { useSearchStore } from "../store/search";
import SearchResults from "./SearchResults";

const HomePage = () => {

    const { ref, inView } = useInView();
    const searchTerm = useSearchStore((state) => state.searchTerm);

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


    if (searchTerm) return <SearchResults />
    if (error instanceof Error) return <>{toast.error(error.message)}</>;

    return (
        <>
            {data?.pages.map((page: any) => (
                <>
                    <div className="flex justify-center">
                        <div
                            key={page.meta.next}
                            className="p-8 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-16"
                        >
                            {page.data.map((product: Product) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                />
                            ))}
                        </div>
                    </div>

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
    );
};

export default HomePage;
