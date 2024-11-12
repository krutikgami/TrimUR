import{AsyncHandler} from '../utils/AsyncHandler.js'
import {ApiError} from '../utils/ApiError.js'
import {ApiResponse} from '../utils/ApiResponse.js'
import {User} from '../models/user.model.js'
import {Url} from '../models/url.model.js'
import mongoose from 'mongoose'

const registerUser = AsyncHandler(async (req, res) => {
    const {username,email,password,confirmPassword} = req.body;

    if(!username || !email || !password || !confirmPassword){
        throw new ApiError(400,"All fields are required");
    }
    else if(password !== confirmPassword){
        throw new ApiError(400,"ConfirmPassword do not match");
    }

    const existedUser = await User.findOne({
       $or : [{ email},{username}],
    });

    if(existedUser){
        throw new ApiError(400,"User already exists");
    }

    const user = await User.create({
        username,
        email,
        password,
        confirmPassword
    });

    const createdUser = await User.findById(user._id).select("-password -confirmPassword");

    if(!createdUser){
        return res.status(400).json(
            new ApiResponse(400,"User not found",null)
        );
    }

    return res.status(200).json(
        new ApiResponse(200,"User created successfully",createdUser)
    );
});

const loginUser = AsyncHandler(async (req, res) => {
    const {username,password} = req.body;

    if(!username || !password){
        throw new ApiError(400,"All fields are required");
    }

    const user = await User.findOne({
        username
    })

    if(!user){
        throw new ApiError(400,"User not found");
    }

    const isPasswordCorrect = await user.ispasswordCorrect(password);

    if(!isPasswordCorrect){
        throw new ApiError(400,"Invalid credentials");
    }

    const createdUser = await User.findById(user._id).select("-password -confirmPassword");

    if(!createdUser){
        return res.status(400).json(
            new ApiResponse(400,"User not found",null)
        );
    }
    return res.status(200).json(
        new ApiResponse(200,"User logged in successfully",createdUser)
    );
});

const urlShortner = AsyncHandler(async(req,res)=>{
   const {user,url,shortUrl} = req.body;

    if(!user || !url || !shortUrl){
        throw new ApiError(400,"All fields are required");
    }
    const userObjectId = new mongoose.Types.ObjectId(user);
     const existedurl = await Url.findOne({
        shortUrl
     })
    
     if(existedurl){
        throw new ApiError(400,"URL already exists");
     }

     const urlData = await Url.create({
        user : userObjectId,
        url,
        shortUrl
     })

     const createdUrl = await Url.findById(urlData._id);

        if(!createdUrl){
            return res.status(400).json(
                new ApiResponse(400,"URL not found",null)
            );
        }

        return res.status(200).json(
            new ApiResponse(200,"URL created successfully",createdUrl)
        );
});

 const getUrlByShortCode = AsyncHandler(async (req, res) => {
    try {
      const { shortUrl } = req.params;
      console.log("shortUrl : ",shortUrl);
      
      const urlData = await Url.findOne({ shortUrl });
      
      if (!urlData) {
        throw new ApiError(404, 'URL not found');
      }

     console.log("urlData : ",urlData);
     
      return res.status(200).json(new ApiResponse(200, 'URL found', urlData));
    } catch (error) {
      return res.status(500).json(new ApiResponse(500, error.message,null));
    }
});



export {registerUser,loginUser,urlShortner,getUrlByShortCode};