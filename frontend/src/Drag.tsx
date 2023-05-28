import React, { ChangeEvent } from 'react';

export default function Drag () {

    const inputRef = React.useRef<HTMLInputElement>(null);
    const [image, setImage] = React.useState<File | null>(null);
    const [filePreview, setFilePreview] = React.useState<string>('');

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
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


    return (
            <div>
            {image === null ? (
                    <label
                    htmlFor="dropzone-file"
                    className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg 
                    bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 
                    dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
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
                    <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                    SVG, PNG, JPG or GIF (MAX. 800x400px)
                    </p>
                    </div>
                    <input
                    ref={inputRef}
            type="file"
                id="dropzone-file"
                multiple={true}
            onChange={handleChange}
            className="absolute inset-0 w-full h-full opacity-0 "
                />
                </label>

                ) : (
                    <div>
                    <button 
                    type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="defaultModal">
                    <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    <span className="sr-only">Close modal</span>
                    </button>
                    <img
                    className='h-48 w-96'
                    src={filePreview}
                    alt="Imagen seleccionada"
                    />
                    </div>

                    )}
            </div>
                );
};

