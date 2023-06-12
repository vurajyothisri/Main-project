import asyncHandler from "../service/asyncHandler"
import CustomError from "../utils/customError"


export const signUp=asyncHandler(async(req,res)=>{
    //get data from user
    const {name,email,password}=req.body
    //validation
    if(!name || !email|| !password){
       throw new CustomError("Please Fill the Field",400)
    }
})