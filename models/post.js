const mongoose=require('mongoose')


const blog=new  mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true
    },
    content:{
        type:String,
        required:true,
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    image:{
        type: String, 
        default: "images/default-blog.jpg",
    },
    deleted:{
       type:Boolean,
       default:false
    },
    date:{
        type:Date,
        default:Date.now
    }
},
    { timestamps: true } 
)


module.exports=mongoose.model('post',blog)