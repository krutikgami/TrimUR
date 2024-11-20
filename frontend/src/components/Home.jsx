import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-yellow-50 flex flex-col items-center justify-center text-gray-800">

            <div className="text-4xl sm:text-3xl md:text-5xl lg:text-5xl font-bold text-blue-700 mb-6">
                TrimUR
            </div>

            <p className="text-base sm:text-sm md:text-lg lg:text-xl mb-8 text-center max-w-md text-gray-700">
                The simplest way to shorten your URLs and track them instantly.
            </p>

            <Link to="/shorturl">
                <button
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md text-sm sm:text-base md:text-lg lg:text-xl font-medium transition-colors duration-200"
                >
                    Start Shortening
                </button>
            </Link>

            <div className="mt-12 text-center max-w-lg">
                <h3 className="text-lg sm:text-base md:text-lg lg:text-xl font-semibold mb-4 text-blue-700">
                    Why TrimUR?
                </h3>
                <p className="text-sm sm:text-xs md:text-base lg:text-lg mb-6 text-gray-600">
                    TrimUR makes link management easy. Whether you need shorter links for emails, social media, or other uses, our tool provides a clean, simple way to organize your URLs.
                </p>

                <div className="flex justify-center gap-6 sm:gap-8 md:gap-10 lg:gap-12">
                    <div className="flex flex-col items-center">
                        <div className="text-blue-600 mb-2">
                            <i className="fas fa-link text-xl sm:text-lg md:text-2xl lg:text-3xl"></i>
                        </div>
                        <p className="text-xs sm:text-[10px] md:text-sm lg:text-base">Easy to Use</p>
                    </div>

                    <div className="flex flex-col items-center">
                        <div className="text-blue-600 mb-2">
                            <i className="fas fa-chart-line text-xl sm:text-lg md:text-2xl lg:text-3xl"></i>
                        </div>
                        <p className="text-xs sm:text-[10px] md:text-sm lg:text-base">Track your Links</p>
                    </div>

                    <div className="flex flex-col items-center">
                        <div className="text-blue-600 mb-2">
                            <i className="fas fa-shield-alt text-xl sm:text-lg md:text-2xl lg:text-3xl"></i>
                        </div>
                        <p className="text-xs sm:text-[10px] md:text-sm lg:text-base">Secure</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomePage;
