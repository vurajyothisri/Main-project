
import mongoose from 'mongoose'
import { object } from 'webidl-conversions'
import AuthRoles from '../utils/authRoles'
//enum:it will give values as array from the objects but not properties here we call utils/authRoles in thar we have a object with user,admin and so on use object.values(aithroles) it will give tha values of the properties
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:["true","Name is required"],
        maxLength:[50,"Name should be less than 50 chars"]
    },
    email:{
        type:String,
        required:["true","email is required"],
        
    },
    password:{
        type:String,
        required:[true,"Password is required"],
        minLength:[8,"password must be atleast 8 chars"],
        select:false,
    },
    role:{
        type:String,
        enum:object.values(AuthRoles),
        default:AuthRoles.USER
    },
    forgotPasswordToken:String,
    forgotPasswordExpiry:Date

},{timestamps:true})
export default  mongoose.model("User",userSchema)