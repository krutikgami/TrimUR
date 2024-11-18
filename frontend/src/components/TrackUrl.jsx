import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

function TrackUrl() {
    const [urls, setUrls] = useState([]);
    const [error, setError] = useState('');
    const { currentUser } = useSelector((state) => state.user);

    useEffect(() => {
        const fetchUrls = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/fetchUrls`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ userId: currentUser?.data?._id })
                });

                if (!res.ok) {
                    throw new Error('Failed to fetch URLs');
                }

                const data = await res.json();
                setUrls(data.urls);
            } catch (error) {
                setError(error.message);
            }
        };

        if (currentUser?.data?._id) {
            fetchUrls();
        }
    }, [currentUser]);

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-yellow-50 px-4 py-8">
            <div className="w-full max-w-6xl bg-white rounded-lg shadow-lg overflow-hidden mt-16 mb-8">
                <div className="p-8">
                    <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Your Tracked URLs</h2>

                    {error && <p className="text-red-500 font-thin text-center">{error}</p>}

                    {urls.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {urls.map((url, index) => (
                                <div key={index} className="p-4 border border-gray-300 rounded-lg shadow-md flex flex-col">
                                    <p className="mb-2"><strong>Created At:</strong> {new Date(url.createdAt).toLocaleDateString('en-GB').replace(/\//g, '-')}</p>
                                    <p className="mb-2"><strong>Original URL:</strong> 
                                        <a href={url.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">{url.url}</a>
                                    </p>
                                    <p className="mb-2"><strong>Short URL:</strong> 
                                        <a href={url.shortUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">{url.shortUrl}</a>
                                    </p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-center text-gray-600">No URLs found for this user.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default TrackUrl;
