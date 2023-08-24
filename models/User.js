import mongoose from 'mongoose'
const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role: {
        type: String,  // You can change this to match your enum type if needed
        enum: ['ADMIN', 'INSPECTOR'], // Valid roles based on your enum
        default: 'INSPECTOR', // Default value if not specified
        required:true
    }
})

mongoose.model("User",userSchema)