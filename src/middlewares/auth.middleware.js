import User from "../models/user.schema.j";
import JWT, { verify } from "jsonwebtoken";
import asyncHandler from "../service/asyncHandler.js";
import config from "../config.js";
import CustomError from "../utils/customError.js";


export const isLoggedin=asyncHandler(async(req,res,next)=>{
   let token;
   if(req.cookie.token||(req.headers.authorization &&req.headers.authorization.startwith(Bearer))){
    token=req.cookies.token|| req.headers.authorization.split(" ")[1];
   }

   if(!token){
    throw new CustomError("Not Authorized to access this resource",400)
   }

   try{
    const decodedJWTPayload=JWT.verify(token,config.JWT_SECRET)
    req.user=await User.findById(decodedJWTPayload._id,"name email role")

    next()

   }catch(error){
    throw new CustomError("Not Authorized to access this resource",400)
   }

})

export const authorize=(...requiredRoles)=>asyncHandler( async(req,res,next)=>{
   if(!requiredRoles.includes(req.user.role)){

    throw new CustomError("You Are Not Authorized to access this resource",400)
   }
   next()
})