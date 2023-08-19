import React, { useState, ChangeEvent, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { edit_product, get_solo_prod } from "../api/products";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";

const EditProductPage = () => {

    const [name, setName] = useState<string>("");
    const [countInStock, setCountInStock] = useState<number>(0);
    const [category, setCategory] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [price, setPrice] = useState<number>(0);
    const [image, setImage] = useState<File | null>(null);
    const [filePreview, setFilePreview] = useState<string>("");
    const inputRef = React.useRef<HTMLInputElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    const { id } = useParams();
    let prodId: number;

    if (id !== undefined) {
        prodId = Number(id)
    }

    const { data } = useQuery({
        queryKey: ['products', id],
        queryFn: () => get_solo_prod(prodId),
    })

    useEffect(() => {
       if (data) {
        setName(data.name)
        setCountInStock(data.count_in_stock)
        setDescription(data.description)
        setCategory(data.category)
        setPrice(data.price)
        setImage(data.image)
       }
    }, [data])

    const navigate = useNavigate()
    const queryClient = useQueryClient();

    const editProdMutation = useMutation({
        mutationFn: edit_product,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["products"] });
            toast.success("Product edited!")
            navigate('/admin')
        },
        onError: () => {
            toast.error("Error!")
            navigate('/admin')
        },
    });

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        editProdMutation.mutate({
            name: name,
            count_in_stock: countInStock,
            category: category,
            description: description,
            price: price,
            image: image,
            id: prodId
        });
    };

    const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    const handleCategoryChange = (event: ChangeEvent<HTMLInputElement>) => {
        setCategory(event.target.value);
    };

    const handleDescriptionChange = (event: ChangeEvent<HTMLInputElement>) => {
        setDescription(event.target.value);
    };

    const handleCountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newNumber = parseInt(event.target.value, 10);
        setCountInStock(newNumber);
    };

    const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newNumber = parseInt(event.target.value, 10);
        setPrice(newNumber);
    };

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];
        if (file) {
            setImage(file);
            const reader = new FileReader();
            reader.onload = () => {
                setFilePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDragEnter = (event: React.DragEvent<HTMLLabelElement>) => {
        event.preventDefault();
        setIsHovered(true);
    };

    const handleDragLeave = (event: React.DragEvent<HTMLLabelElement>) => {
        event.preventDefault();
        setIsHovered(false);
    };

    const removeImage = () => {
        setImage(null);
        setIsHovered(false);
    };

    if (editProdMutation.isLoading) return <p>Loader....</p>

    return (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 ">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-[700px] w-[600px] rounded-md">
                <div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
                    <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
                        <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                Edit Product
                            </h3>
                            <Link
                                to="/admin"
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
                            </Link>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="grid gap-4 mb-4 sm:grid-cols-2">
                                <div>
                                    <label
                                        htmlFor="name"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Name
                                    </label>
                                    <input
                                        value={name}
                                        onChange={handleNameChange}
                                        type="text"
                                        name="name"
                                        id="name"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        placeholder="Type product name"
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="count_in_stock"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Count in Stock
                                    </label>
                                    <input
                                        value={countInStock}
                                        onChange={handleCountChange}
                                        type="number"
                                        name="count_in_stock"
                                        id="count_in_stock"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        placeholder="Count in Stock"
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="price"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Price
                                    </label>
                                    <input
                                        value={price}
                                        onChange={handlePriceChange}
                                        type="number"
                                        name="price"
                                        id="price"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        placeholder="$2999"
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="category"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Category
                                    </label>
                                    <input
                                        value={category}
                                        onChange={handleCategoryChange}
                                        type="text"
                                        name="category"
                                        id="category"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        placeholder="Category"
                                    />
                                </div>

                                <div className="sm:col-span-2">
                                    <label
                                        htmlFor="description"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Description
                                    </label>
                                    <input
                                        value={description}
                                        onChange={handleDescriptionChange}
                                        id="description"
                                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        placeholder="Write product description here"
                                    ></input>
                                </div>

                                <div className="sm:col-span-2">
                                    <div className="flex items-center justify-center w-full">
                                        {image === null ? (
                                            <label
                                                htmlFor="dropzone-file"
                                                className={`flex flex-col items-center justify-center w-full h-64 
        border-2 border-gray-600 border-dashed rounded-lg 
        cursor-pointer bg-gray-40 ${
            isHovered ? "bg-gray-600" : "hover:bg-gray-600"
        }`}
                                                onDragEnter={handleDragEnter}
                                                onDragLeave={handleDragLeave}
                                            >
                                                <svg
                                                    aria-hidden="true"
                                                    className="w-10 h-10 mb-3 text-gray-400"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                        stroke-width="2"
                                                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                                    ></path>
                                                </svg>
                                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                                        <span className="font-semibold">
                                                            Click to upload
                                                        </span>{" "}
                                                        or drag and drop
                                                    </p>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                                        SVG, PNG, JPG or GIF
                                                        (MAX. 800x400px)
                                                    </p>
                                                </div>
                                                <input
                                                    ref={inputRef}
                                                    type="file"
                                                    id="dropzone-file"
                                                    multiple={true}
                                                    onChange={handleFileChange}
                                                    className="absolute w-full h-[300px] opacity-0"
                                                />
                                            </label>
                                        ) : (
                                            <div>
                                                <button
                                                    onClick={removeImage}
                                                    type="button"
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
                                                    <span className="sr-only">
                                                        Close modal
                                                    </span>
                                                </button>
                                                <img
                                                    className="h-48 w-96"
                                                    src={filePreview || `${import.meta.env.VITE_BACKEND_URL}${data.image}`}
                                                    alt="Imagen seleccionada"
                                                />
                                            </div>
                                        )}
                                    </div>
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
                                Save product
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default EditProductPage;
