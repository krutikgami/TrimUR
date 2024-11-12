import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function ShortUrl() {
  const [formdata, setFormdata] = useState({ url: '', shortUrl: '' });
  const [generatedLink, setGeneratedLink] = useState('');
  const [errormessage, setErrormessage] = useState('');
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormdata({ ...formdata, [e.target.id]: e.target.value });
  };

  const handleGenerate = async (e) => {
    e.preventDefault();

    if (!formdata.url || !formdata.shortUrl) {
      return setErrormessage("All fields are required");
    }

    const requestData = { ...formdata, user: currentUser?.data?._id };

    try {
      const res = await fetch('/Api/v1/users/shortUrl', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestData),
      });

      const data = await res.json();

      if (res.ok) {
        setGeneratedLink(`http://localhost:5173/${formdata.shortUrl}`);
        // navigate('/');
      } else {
        setErrormessage(data.message || 'Failed to generate short URL');
      }
    } catch (error) {
      setErrormessage(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-yellow-50 px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">URL Shortener</h2>
        <form onSubmit={handleGenerate}>
          <div className="mb-4">
            <label htmlFor="url" className="block text-lg text-gray-700">Enter URL</label>
            <input
              type="text"
              id="url"
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter the URL to shorten"
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="shortUrl" className="block text-lg text-gray-700">Short URL Suffix</label>
            <input
              type="text"
              id="shortUrl"
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter custom short URL suffix"
              onChange={handleChange}
              required
            />
          </div>

          <button
            type='submit'
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Generate
          </button>

          {generatedLink && (
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
          {errormessage && (
            <div className="mt-4 text-red-600 text-center">
              {errormessage}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default ShortUrl;
