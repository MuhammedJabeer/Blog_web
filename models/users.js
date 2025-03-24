const mongoose=require('mongoose')


const userschema=new mongoose.Schema({
    username:{
        type:String,
        required: true,
        unique: true,
        trim: true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
        trim:true
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
      },
      blocked:{
        type:Boolean,
        default:false
      }
    },
    { timestamps: true }
)


module.exports=mongoose.model('User',userschema)