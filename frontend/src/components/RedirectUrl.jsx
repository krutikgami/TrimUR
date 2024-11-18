import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function RedirectUrl() {
  const { shortUrl } = useParams();
  const navigate = useNavigate();  // For navigating to the home page after redirection

  useEffect(() => {
    const fetchOriginalUrl = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/${shortUrl}`);
        const data = await res.json();
        console.log(data);

        if (res.ok) {
          // Redirect to the original URL in the same tab
          window.location.href = data.data.url;
        } else {
          console.error(data.message);
          // Redirect to homepage if there's an error
          navigate('/');
        }
      } catch (error) {
        console.error('Error fetching the original URL:', error);
        // Redirect to homepage in case of error
        navigate('/');
      }
    };

    fetchOriginalUrl();
  }, [shortUrl, navigate]);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <p>Redirecting...</p>
    </div>
  );
}

export default RedirectUrl;
