import React, { useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const NotFound = () => {
    const navigate = useNavigate();
    const { data } = useLoaderData();
    const [dogImage, setDogImage] = useState(data.message);

    const { mutate: fetchNewDog, isPending } = useMutation({
        mutationFn: async () => {
            const { data } = await axios.get('https://dog.ceo/api/breeds/image/random');
            return data;
        },
        onSuccess: data => setDogImage(data.message),
        onError: error => {
            console.error('Error fetching new dog image:', error);
        }
    });

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="max-w-md w-full space-y-8 text-center">
                <div className="space-y-4">
                    <div className="space-y-2">
                        <h1 className="text-5xl font-bold text-base-content/80">404</h1>
                        <p className="text-lg text-base-content/60">Page Not Found</p>
                    </div>

                    <div className="card shadow-xl">
                        <figure className="px-4 pt-4 relative">
                            {isPending && (
                                <div className="absolute inset-0 flex items-center justify-center rounded-xl">
                                    <span className="loading loading-spinner loading-md"></span>
                                </div>
                            )}
                            <img
                                src={dogImage}
                                alt="Cute dog"
                                className="rounded-xl h-64 w-full object-cover object-center"
                                onError={e => {
                                    e.target.src = 'https://http.cat/404';
                                    e.target.alt = 'Fallback 404 cat';
                                }}
                            />
                        </figure>

                        <div className="card-body items-center text-center">
                            <p className="text-base-content/70 text-xs">
                                Don't worry! Our furry friend will help you find your way back home.
                            </p>
                            <div className="card-actions gap-4 mt-2">
                                <button
                                    onClick={fetchNewDog}
                                    className="btn btn-outline btn-sm rounded-md hover:scale-105 transition-transform duration-200 ease-in-out"
                                    disabled={isPending}
                                >
                                    {isPending ? (
                                        <span className="loading loading-spinner loading-xs"></span>
                                    ) : (
                                        'Change Dog'
                                    )}
                                </button>
                                <button
                                    onClick={() => navigate('/')}
                                    className="btn btn-primary btn-sm rounded-md hover:scale-105 transition-transform duration-200 ease-in-out"
                                >
                                    Return Home
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
