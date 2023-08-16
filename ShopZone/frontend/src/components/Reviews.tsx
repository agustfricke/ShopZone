import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react"
import { FaStar } from "react-icons/fa"
import { create_review } from "../api/products";
import { toast } from "react-hot-toast";
import Rating from "./Rating";


interface Props {
    productId: number
    reviews: []
};

const Reviews = ({productId, reviews}: Props) => {

    const [show, setShow] = useState(false)

    const [description, setDescription] = useState("")
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);

    const queryClient = useQueryClient();

    const createReview = useMutation({
        mutationFn: () => create_review(description, rating, productId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["products"] });
            toast.success("Review created");
            setShow(false)
        },
        onError: () => {
            toast.error("Error!");
        },
    });

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        createReview.mutate();
    };

    return (
        <>
            {show && 
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 ">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-[700px] w-[600px] rounded-md">
                <div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
                    <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
                        <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">ProductCa
                                Add Review
                            </h3>
                            <button
                                onClick={() => setShow(false)}
                                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                data-modal-toggle="defaultModal"
                            >
                                <svg
                                    aria-hidden="true"
                                    className="w-5 h-5"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fill-rule="evenodd"
                                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                        clip-rule="evenodd"
                                    ></path>
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="grid gap-4 mb-4 sm:grid-cols-2">

                                <div>
                                    <label
                                        htmlFor="name"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Description
                                    </label>
                                    <input
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        type="text"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        placeholder="Type here"
                                    />
                                </div>

                
                      <div className="star-rating text-3xl text-center mt-8">
                        {[...Array(5)].map((_, index) => {
                          index += 1;
                          return (
                            <button
                              type="button"
                              key={index}
                              className={index <= ((rating && hover) || hover) ? "on" : "off"}
                              onClick={() => setRating(index)}
                              onMouseEnter={() => setHover(index)}
                              onMouseLeave={() => setHover(rating)}

                            >
                              <span> <FaStar /> </span>
                            </button>
                          );
                        })}
                                </div>

                                </div>

                            <button
                                type="submit"
                                className="text-white inline-flex items-center bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                            >
                                <svg
                                    className="mr-1 -ml-1 w-6 h-6"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fill-rule="evenodd"
                                        d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                                        clip-rule="evenodd"
                                    ></path>
                                </svg>
                                    Create Review
                            </button>
                        </form>
                    </div>
                </div>
                </div>
                </div>
            }
            <section className="bg-white dark:bg-gray-900">
                <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-6">
                    <div className="mx-auto max-w-screen-sm">
                        <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
                            Reviews of Arch Linux
                        </h2>
                        <p className="mb-8 font-light text-gray-500 lg:mb-16 sm:text-xl dark:text-gray-400">
                            Explore the reivews of this product
                        </p>
                        <button
                        onClick={() => {
                            setShow(true)
                        }}
                        className="inline-flex items-center mx-3 px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >Create a review</button>
                    </div>
                </div>
            </section>

            {reviews && reviews.map((r: any) => (
            <article className="container mx-auto ">
                <div className="flex items-center mb-4 space-x-4">
                    <img
                        className="w-10 h-10 rounded-full"
                        src={`${import.meta.env.VITE_BACKEND_URL}${r.avatar}`}
                        alt=""
                    />
                    <div className="space-y-1 font-medium dark:text-white">
                        <p>{r.user}</p>
                    </div>
                </div>
                    
                    <Rating value={r.rating}/>
                
                <footer className="mb-5 text-sm text-gray-500 dark:text-gray-400">
                    <p>{r.created.slice(0,10)}</p>
                </footer>
                <p className="mb-2 text-gray-500 dark:text-gray-400">
                    {r.description}
                </p>
            </article>
                ))}
        </>
    );
};
export default Reviews;
