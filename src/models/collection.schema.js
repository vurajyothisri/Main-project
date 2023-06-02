import mongoose from "mongoose";


const collectionSchema=new mongoose.Schema({
    name:{
        type:String,
        required:["true","please provide a collection name"],
        trim:true,
        maxLength:[
            120,
            "collection name should not be more than 120 chars"
        ]
    },
    
},
{timestamps:true}
);
export default mongoose.model("Collections",collectionSchema)
//in database it store as small letters ex:Collections it converts into collections