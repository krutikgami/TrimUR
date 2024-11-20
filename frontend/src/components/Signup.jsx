import React, { useState,useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSpinner } from "react-icons/fa"; 
import {  useSelector,useDispatch } from "react-redux";
import { startLoading,stopLoading,resetLoading } from "../redux/userSlice.js";

function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formdata, setFormdata] = useState({});
  const [errormessage, setErrormessage] = useState(null);
  const { loading, error: errorMessage } = useSelector((state) => state.user);

  useEffect(()=>{
    dispatch(resetLoading());
  },[dispatch])

  const handleChange = (e) => {
    setFormdata({ ...formdata, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setErrormessage(null);

      dispatch(startLoading())

      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formdata),
      });

      if (res.ok) {
        navigate("/login");
      }
    } catch (error) {
      setErrormessage(error.message);
    }



    if (!formdata.username || !formdata.email || !formdata.password || !formdata.confirmPassword) {
       setErrormessage("All Fields Are required");
    } else if (formdata.password !== formdata.confirmPassword) {
       setErrormessage("Passwords Do not match");
    } else {
       setErrormessage("User Already Existed");
    }

    dispatch(stopLoading());
  };

  return (
    <div className="flex mt-14 justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-yellow-50 px-4 py-8 sm:py-10 lg:py-16">
      <div className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-6 sm:p-8 lg:p-12">
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-center text-gray-800 mb-6">
            Create Your Account
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="username"
                className="block text-sm sm:text-base md:text-lg text-gray-700"
              >
                Username
              </label>
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
              <label
                htmlFor="email"
                className="block text-sm sm:text-base md:text-lg text-gray-700"
              >
                Email
              </label>
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
              <label
                htmlFor="password"
                className="block text-sm sm:text-base md:text-lg text-gray-700"
              >
                Password
              </label>
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
              <label
                htmlFor="confirmPassword"
                className="block text-sm sm:text-base md:text-lg text-gray-700"
              >
                Confirm Password
              </label>
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
  className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300 flex items-center justify-center"
  type="submit"
  disabled={loading}
>
  {loading ? (
    <FaSpinner className="animate-spin text-white" />
  ) : (
    "Signup"
  )}
</button>

          </form>

          <div className="flex justify-end mt-5">
            <Link to="/login">
              <span className="text-sm sm:text-base md:text-lg text-gray-600 hover:text-gray-800 transition">
                Login?
              </span>
            </Link>
          </div>

          {errormessage && (
            <p className="text-xs sm:text-sm md:text-base lg:text-lg text-red-500 text-center mt-4 font-thin">
              {errormessage}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Signup;
