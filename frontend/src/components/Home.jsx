import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-yellow-50 flex flex-col items-center justify-center text-gray-800">
            {/* Logo Section */}
            <div className="text-5xl font-bold text-blue-700 mb-6">
               TrimUR
            </div>

            {/* Subtitle */}
            <p className="text-lg mb-8 text-center max-w-md text-gray-700">
                The simplest way to shorten your URLs and track them instantly.
            </p>

            {/* Main Button */}
            <Link to="/shorturl">
            <button
                // onClick={goToShortener}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md text-md font-medium transition-colors duration-200"
            >
                Start Shortening
            </button>
            </Link>

            {/* Additional Info Section */}
            <div className="mt-12 text-center max-w-lg">
                <h3 className="text-xl font-semibold mb-4 text-blue-700">Why TrimUR?</h3>
                <p className="text-md mb-6 text-gray-600">
                TrimUR makes link management easy. Whether you need shorter links for emails, social media, or other uses, our tool provides a clean, simple way to organize your URLs.
                </p>

                <div className="flex justify-center gap-10">
                    {/* Icon and Text for Features */}
                    <div className="flex flex-col items-center">
                        <div className="text-blue-600 mb-2">
                            <i className="fas fa-link text-2xl"></i>
                        </div>
                        <p className="text-sm">Easy to Use</p>
                    </div>

                    <div className="flex flex-col items-center">
                        <div className="text-blue-600 mb-2">
                            <i className="fas fa-chart-line text-2xl"></i>
                        </div>
                        <p className="text-sm">Track your Links</p>
                    </div>

                    <div className="flex flex-col items-center">
                        <div className="text-blue-600 mb-2">
                            <i className="fas fa-shield-alt text-2xl"></i>
                        </div>
                        <p className="text-sm">Secure</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomePage;
