import asyncHandler from "../service/asyncHandler"
import CustomError from "../utils/customError"
import User from "../models/user.schema.js"
export const cokkieOptions={
    expires:new Date(Date.now()+3*24*60*60*1000),
    httpOnly:true
}
export const signUp=asyncHandler(async(req,res)=>{
    //get data from user
    const {name,email,password}=req.body
    //validation
    if(!name || !email|| !password){
       throw new CustomError("Please Fill the Field",400)
    }
   //check if user already exits
    const existingUser=await User.findOne({email})
    if(existingUser){
        throw new CustomError("User Already Exits",400)

    }
    const user=await User.create({
        name,
        email,
        password

    })
    const token=user.getJWTtoken()
    //safety
    res.cookie("token",token,cokkieOptions)
    
    user.password=undefined
    res.status(200).json({
        success:true,
        token,
       user,
    })

})
export const login=asyncHandler(async(req,res)=>{

    const {email,password}=req.body

    if(!email||!password){
        throw new CustomError("PLEASE FILL THE FILED",400)
    }
    const user=User.findOne({email}).select("+password")
    if(!user){
        throw new CustomError("Invalid Credential",400)
    }
    const ispasswordmatched=await user.comparePassword(password)
    if(ispasswordmatched){
      const token=  user.getJWTtoken
      user.password=undefined
      res.cokkie("token",token,cokkieOptions)
      return res.status(200).json({
        success:true,
        token,
        user
      })
    }
    throw new CustomError("Password I s Incorrect",400)
})

export const logout=asyncHandler(async(req,res)=>{
    res.cookie("token",null,{
        expires:new Date(Date.now()),
        httpOnly:true
    })
    res.status(200).json({
        success:true,
        message:"Logged Out"
    })
})
export const getProfile=asyncHandler(async(req,res)=>{
   const {user}=req
   if(!user){
    throw new CustomError("User not found",401)
   }
   res.status(200).json({
    success:true,
    user
   })
})
