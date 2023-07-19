import Product from '../models/product.schema.js'
import formidable from 'formidable'
import {s3Fileupload,s3deleteFile} from '../service/imageUpload.js'
import Mongoose from 'mongoose'
import asyncHandler  from "../service/asyncHandler.js"
import CustmError from "../utils/customError.js"
import config from "../config/index.js"

export const addProduct =asyncHandler(async(req,res)=>{
    const form=formidable({multiples:true,keepExtensions:true})

    form.parse(req,async function(err,fields,files){
        if(err){
            throw new CustmError(err.message||"somthing went wrong",500)
        }
        let productId=new Mongoose.Types.ObjectId().toHexString()

        console.log(fields,files)
    })
})