import React, { useState } from 'react';

function ShortUrl() {
  const [url, setUrl] = useState('');
  const [shortUrlSuffix, setShortUrlSuffix] = useState('');
  const [generatedLink, setGeneratedLink] = useState('');

  // Function to handle URL generation (replace with actual logic)
  const handleGenerate = () => {
    // For demonstration, the generated link combines a base URL with the custom short URL suffix
    if(url && shortUrlSuffix){
    setGeneratedLink(`https://short.url/${shortUrlSuffix}`);
    }
  };

return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-yellow-50 px-4">
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
            
            {/* Form Title */}
            <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">URL Shortener</h2>

            {/* URL Input Field */}
            <div className="mb-4">
                <label htmlFor="url" className="block text-lg text-gray-700">Enter URL</label>
                <input 
                    type="text" 
                    id="url" 
                    className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter the URL to shorten" 
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    required
                />
            </div>

            {/* Custom Short URL Input Field */}
            <div className="mb-4">
                <label htmlFor="shortUrlSuffix" className="block text-lg text-gray-700">Short URL Suffix</label>
                <input 
                    type="text" 
                    id="shortUrlSuffix" 
                    className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter custom short URL suffix" 
                    value={shortUrlSuffix}
                    onChange={(e) => setShortUrlSuffix(e.target.value)}
                    required
                />
            </div>

            {/* Generate Button */}
            <button 
                onClick={handleGenerate} 
                className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
            >
                Generate
            </button>

            {/* Display Generated Link */}
            { generatedLink && (
                <div className="mt-6 text-center">
                    <p className="text-lg text-gray-800">Generated Link:</p>
                    <a 
                        href={generatedLink} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-blue-600 font-semibold hover:underline"
                    >
                        {generatedLink}
                    </a>
                </div>
            )}
        </div>
    </div>
);
}

export default ShortUrl;
