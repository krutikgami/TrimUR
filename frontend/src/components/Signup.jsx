import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";


function Signup() {
  const navigate = useNavigate();
  const [formdata, setFormdata] = useState({});
  const [errormessage, setErrormessage] = useState(null);
  const [load, setLoad] = useState(false);

  const handleChange = (e) => {
    setFormdata({ ...formdata, [e.target.id]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoad(true);
      setErrormessage(null);

      const res = await fetch('/Api/v1/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formdata),
      });

      setLoad(false);
      if (res.ok) {
        navigate('/login');
      }
    } catch (error) {
      setLoad(false);
      setErrormessage(error.message);
    }

    if (!formdata.username || !formdata.email || !formdata.password || !formdata.confirmPassword) {
      return setErrormessage('All Fields Are required');
    } else if (formdata.password !== formdata.confirmPassword) {
      return setErrormessage('Passwords Do not match');
    } else {
      return setErrormessage('User Already Existed');
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen mt-14 bg-gradient-to-br from-blue-50 via-blue-100 to-yellow-50 px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-8 mt-10">
          <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Create Your Account</h2>
          

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="username" className="block text-lg text-gray-700">Username</label>
              <input 
                type="text" 
                id="username" 
                className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your username" 
                onChange={handleChange}
                required
              />
            </div>


            <div className="mb-4">
              <label htmlFor="email" className="block text-lg text-gray-700">Email</label>
              <input 
                type="email" 
                id="email" 
                className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email" 
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="block text-lg text-gray-700">Password</label>
              <input 
                type="password" 
                id="password" 
                className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password" 
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-6">
              <label htmlFor="confirmPassword" className="block text-lg text-gray-700">Confirm Password</label>
              <input 
                type="password" 
                id="confirmPassword" 
                className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Confirm your password" 
                onChange={handleChange}
                required
              />
            </div>

            <button 
              className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
              type="submit"
            >
              Signup
            </button>
          </form>
   
          <div className="flex mt-5 justify-end">
            <Link to="/login">
              <span className="text-gray-600">Login?</span>
            </Link>
          </div>
          { errormessage &&(
            <p className='text-red-500 font-thin'>{errormessage}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Signup;
