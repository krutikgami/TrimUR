import React, { useState,useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { FaSpinner } from "react-icons/fa"; 
import { startLoading,stopLoading,resetLoading } from '../redux/userSlice.js';

function ShortUrl() {

  const dispatch = useDispatch()
  const [formdata, setFormdata] = useState({ url: '', shortUrl: '' });
  const [generatedLink, setGeneratedLink] = useState('');
  const [errormessage, setErrormessage] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isanalayzing,setanalayzing] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const { loading, error: errorMessage } = useSelector((state) => state.user);

  useEffect(()=>{
    dispatch(resetLoading())
    // setanalayzing(false);
  },[dispatch])


  const handleChange = (e) => {
    setFormdata({ ...formdata, [e.target.id]: e.target.value });
  };

  const handleGenerate = async (e) => {
    e.preventDefault();

    dispatch(startLoading())

    if (!formdata.url || !formdata.shortUrl) {
      return setErrormessage("All fields are required");
    }

    const requestData = { ...formdata, user: currentUser?.data?._id };

    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/shortUrl`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestData),
      });

      const data = await res.json();

      if (res.ok) {
        setGeneratedLink(`${import.meta.env.VITE_URL}/${formdata.shortUrl}`);
      } else {
        setErrormessage(data.message || 'Failed to generate short URL');
      }
    } catch (error) {
      setErrormessage(error.message);
    }
    dispatch(stopLoading())
  };

  const handleAnalyze = async () => {
    setanalayzing(true)
    const baseUrl = formdata.url
      .replace(/^https?:\/\//, "")
      .replace(/\.(com|in|org|net|edu|gov|tv|io)(\/|$)/, "");
    if (!baseUrl) {
      setErrormessage("Url Field is required");
      setTimeout(() => {
        setErrormessage("");
      }, 2000);
    } else {
      const prompt = `Suggest 20 unique, funny, and short one-word names for the URL: ${baseUrl}. Only provide plain text names without using any symbols, punctuation, or special characters.`;

      const requestBody = {
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
      };

      const apiKey = import.meta.env.VITE_API_KEY;

      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${apiKey}`;

      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch suggestions from API');
        }

        const result = await response.json();

        if (result?.candidates && result.candidates[0]?.content?.parts[0]?.text) {
          const dataText = result.candidates[0].content.parts[0].text;

          const data = dataText
            .split("\n")
            .map((item) =>
              item
                .replace(/^\d+\.\s/, '')
                .replace(/\.(com|in|org|net|edu|gov)(\/|$)/, "")
                .replace(/[()]/g, '')
                .trim()
            )
            .filter(Boolean);

          setSuggestions(data);
          console.log("Suggestions:", data);

          if (data.length > 0) {
            setFormdata((prev) => ({ ...prev, shortUrl: data[0] }));
          }
        } else {
          throw new Error("Unexpected response structure");
        }
      } catch (error) {
        setErrormessage(error.message || "Failed to analyze suggestions");
        setTimeout(() => {
          setErrormessage("");
        }, 2000);
      }
    }
   setanalayzing(false);
  };

  const handleNext = () => {
    if (suggestions.length > 0) {
      const nextIndex = (currentIndex + 1) % suggestions.length;
      setCurrentIndex(nextIndex);
      setFormdata((prev) => ({ ...prev, shortUrl: suggestions[nextIndex] }));
    }
  };

  const handlePrev = () => {
    if (suggestions.length > 0) {
      const prevIndex = (currentIndex - 1 + suggestions.length) % suggestions.length;
      setCurrentIndex(prevIndex);
      setFormdata((prev) => ({ ...prev, shortUrl: suggestions[prevIndex] }));
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-yellow-50 px-4">
      <div className="w-full max-w-sm md:max-w-md lg:max-w-lg bg-white rounded-lg shadow-lg p-6 md:p-8 lg:p-10">
        <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-center text-gray-800 mb-4 md:mb-6">
          URL Shortener
        </h2>
        <form onSubmit={handleGenerate}>
          <div className="mb-4">
            <label htmlFor="url" className="block text-sm md:text-base lg:text-lg text-gray-700">
              Enter URL
            </label>
            <input
              type="text"
              id="url"
              className="w-full p-2 md:p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter the URL to shorten"
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4 flex flex-col md:flex-row md:items-center md:space-x-4">
            <div className="w-full">
              <label htmlFor="shortUrl" className="block text-sm md:text-base lg:text-lg text-gray-700">
                Short URL Suffix
              </label>
              <input
                type="text"
                id="shortUrl"
                className="w-full p-2 md:p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter custom short URL suffix"
                value={formdata.shortUrl}
                onChange={handleChange}
                required
              />
            </div>
            <button
              type="button"
              className=" flex items-center justify-center mt-2 lg:mt-7  md:mt-6 p-2 md:p-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
              onClick={handleAnalyze}
              disabled={isanalayzing}
            >
              {isanalayzing ? ( <FaSpinner className="animate-spin text-white" />
              ):(
              "Analyze"
            )}
            </button>
          </div>

          <div className="flex justify-between mb-4">
            <button
              type="button"
              className="py-2 px-4 bg-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-400 transition duration-300"
              onClick={handlePrev}
              disabled={suggestions.length === 0}
            >
              &lt; Prev
            </button>
            <button
              type="button"
              className="py-2 px-4 bg-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-400 transition duration-300"
              onClick={handleNext}
              disabled={suggestions.length === 0}
            >
              Next &gt;
            </button>
          </div>

          <button
            type="submit"
            className=" flex items-center justify-center w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
            disabled={loading}
          >
            {loading? ( <FaSpinner className="animate-spin text-white" /> 
            ):(
            "Generate"
          )}
          </button>

          {generatedLink && (
            <div className="mt-6 text-center">
              <p className="text-sm md:text-base lg:text-lg text-gray-800">Generated Link:</p>
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
