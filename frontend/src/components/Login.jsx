import React,{useState} from 'react';
import Lottie  from 'lottie-react';
import animationData from '../assets/Animation.json'; // Import your Lottie animation file
import {Link,useNavigate} from "react-router-dom"
import { loginStart,signInFailure,signInSuccess } from '../redux/userSlice.js';
import { useDispatch,useSelector } from "react-redux";
function Login() {

const navigate = useNavigate();
const [formdata,setFormdata] = useState({});
const [errormessage,setErrormessage] = useState(null);
const dispatch = useDispatch();

const { loading, error: errorMessage } = useSelector((state) => state.user); 

const handleChange = (e) =>{
  setFormdata({...formdata,[e.target.id]: e.target.value})
}

const handleSubmit = async (e) =>{
  e.preventDefault();
  setErrormessage(null)
  dispatch(loginStart())


  try {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/login`,{
      method : 'POST',
      headers : { 'Content-Type': 'application/json'},
      body : JSON.stringify(formdata)
    })
    const data = await res.json();

    if (data.success === false) {
      dispatch(signInFailure(data.message));
    }

    if(res.ok){
      dispatch(signInSuccess(data))
      navigate('/')
    }

      
    
  } catch (error) {
    setErrormessage(error.message)
    dispatch(signInFailure(error.message))
  }
  if(!formdata.username || !formdata.password){
    return setErrormessage("All fields are required")
    // return dispatch(signInFailure("All fields are required"))
  }
  else{
    return setErrormessage("User not Found")
  }

}
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-yellow-50">

      <div className="flex w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden">

   
        <div className="w-1/2 p-8 flex justify-center items-center bg-gray-200">
          <Lottie animationData={animationData} loop={true} className="w-3/4" />
        </div>

        <div className="w-1/2 p-8">

          <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Login to Your Account</h2>
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

          <div className="mb-6">
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

          <button className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
            type='submit'
          >
            Login
          </button>
          </form>
         <div className='flex mt-5 justify-end'>
          <Link to= "/signup">
          <span className='text-gray-600'>SignUp?</span>
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

export default Login;
