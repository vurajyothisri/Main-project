import Collection from "../models/collection.schema.js";
import asyncHandler from "../service/asyncHandler.js";
import CustomError from "../utils/customError";

export const createCollection=asyncHandler(async(req,res)=>{
    const {name}=req.body
    if(!name){
        throw new CustomError("Collection nname is required",400)
    }

   const collection=await Collection.create({
        name
    })
    res.status(200).json({
        success:true,
        message:"Collection was created successfully"
    })
})
export const updateCollection=asyncHandler(async(req,res)=>{
    const {name}=req.body
    const {id:collectionId}=req.params
    if(!name){
        throw new CustomError("Collection name is required",400)
    }

   let updatedCollection=await Collection.findByIdAndUpdate(collectionId,{
    name
   },{
    new:true,
    runValidators:true
   })
   if(!updatedCollection){
    throw new CustomError("Collection not found",400)
}
    res.status(200).json({
        success:true,
        message:"Collection updated successfully",
        updateCollection
    })
})
export const deleteCollection=asyncHandler(async(req,res)=>{
    const {id:collectionId}=req.params
   

  const collectiontoDelete=await Collection.findById(collectionId)
   if(!collectiontoDelete){
    throw new CustomError("Collection to bedeleted  not found",400)
}
collectiontoDelete.remove()
    res.status(200).json({
        success:true,
        message:"Collection deleted successfully",
        updateCollection
    })
})
export const getAllCollection=asyncHandler(async(req,res)=>{
    
   

  const collection=await Collection.find()
   if(!collection){
    throw new CustomError("no collection  found",400)
}

    res.status(200).json({
        success:true,
       collection
    })
})