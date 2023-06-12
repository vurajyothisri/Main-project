import mongoose from "mongoose";

const ProductSchema=new mongoose.Schema({
    name:{
        type:String,
    require:['true','please provide product name'] ,
    trim:true,
    maxLength:[120," product name should not be max than 120 chars"]   },
price:{
    type:Number,
    require:['true','please provide product price'] ,
    maxLength:[5," product name should not be max than 5 chars"]
},
description:{
    type:String,
},
photos:[
    {
        secure_url:{
            type:String,
            required:true
        }
    },
   
],
stock:{
    type:Number,
    default:0
},
sold:{
    type:Number,
    default:0,
},
collectionId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Collections"
}
},{timestamps:true})

export default mongoose.model("Product",ProductSchema)