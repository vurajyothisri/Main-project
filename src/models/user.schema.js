
import mongoose from 'mongoose'
import { object } from 'webidl-conversions'
import AuthRoles from '../utils/authRoles'
import bcrypt from "bcryptjs"
import JWT from "jsonwebtoken"
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
//Encrypt the password before saving
//pre as two parametres first one the event and second parameter is what to do we dont use arrow function in mongodbhooks
userSchema.pre("save",async function(next){
    if(!this.isModified("password")) return next()//don't want to do any this wehn it is not modified
    this.password=await bcrypt.hash(this.password,10)
    next()
})

userSchema.methods={
    //compare password ex:login it will encrypt password using asame algorithm and match the password in database
    //enteredpassword is targeting the user enterd password while login
    comparePassword:async function(enteredPassword){
        return await bcrypt.compare(enteredPassword,this.password)

    },
    //generate JWT token
    getJWTtoken:function(){
        
    }
}



export default  mongoose.model("User",userSchema)