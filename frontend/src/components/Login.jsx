import React, { useState,useEffect } from "react";
import Lottie from "lottie-react";
import animationData from "../assets/Animation.json"; 
import { Link, useNavigate } from "react-router-dom";
import { loginStart, signInFailure, signInSuccess,resetLoading } from "../redux/userSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { FaSpinner } from "react-icons/fa"; 

function Login() {
  const navigate = useNavigate();
  const [formdata, setFormdata] = useState({});
  const [errormessage, setErrormessage] = useState(null);
  const dispatch = useDispatch();
  const { loading, error: errorMessage } = useSelector((state) => state.user);


  useEffect(()=>{
    dispatch(resetLoading())
  },[dispatch])

  const handleChange = (e) => {
    setFormdata({ ...formdata, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrormessage(null);
    dispatch(loginStart());

    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formdata),
      });
      const data = await res.json();

      if (data.success === false) {
        dispatch(signInFailure(data.message));
      }

      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate("/");
      }
    } catch (error) {
      setErrormessage(error.message);
      dispatch(signInFailure(error.message));
    }

    if (!formdata.username || !formdata.password) {
       setErrormessage("All fields are required");
      dispatch(signInFailure("All fields are required"));
    } else {
       setErrormessage("User not Found");
      dispatch(signInFailure("user not found"));
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-yellow-50 px-4 md:px-8 lg:px-12">
      <div className="flex flex-col lg:flex-row md:flex-row w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden mt-14 lg:mt-0">
        <div className="w-full lg:w-1/2 p-6 bg-gray-200 flex justify-center items-center">
          <Lottie animationData={animationData} loop={true} className="w-3/4 md:w-2/3" />
        </div>
        <div className="w-full lg:w-1/2 p-6 md:p-8 lg:p-12">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-center text-gray-800 mb-6">
            Login to Your Account
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="username" className="block text-sm md:text-base lg:text-lg text-gray-700">
                Username
              </label>
              <input
                type="text"
                id="username"
                className="w-full p-2 md:p-3 mt-2 border border-gray-300 rounded-lg text-sm md:text-base lg:text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your username"
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-6">
              <label htmlFor="password" className="block text-sm md:text-base lg:text-lg text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full p-2 md:p-3 mt-2 border border-gray-300 rounded-lg text-sm md:text-base lg:text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
                onChange={handleChange}
                required
              />
            </div>

            <button className="w-full py-2 md:py-3 bg-blue-600 text-white font-medium md:font-semibold rounded-lg text-sm md:text-base lg:text-lg hover:bg-blue-700 transition duration-300 flex justify-center items-center"
              type="submit"
              disabled={loading} 
            >
          {loading ? (
              <FaSpinner className="animate-spin text-white" />
           ) : (
               "Login"
          )}
        </button>

          </form>

          <div className="flex mt-4 md:mt-6 justify-end">
            <Link to="/signup">
              <span className="text-sm md:text-base text-gray-600 hover:text-gray-800 transition">
                SignUp?
              </span>
            </Link>
          </div>

          {errormessage && (
            <p className="text-sm md:text-base text-red-500 font-thin text-center mt-4">
              {errormessage}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;
