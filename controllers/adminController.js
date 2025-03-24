const user=require("../models/users");
const post=require('../models/post');





exports.getadmin= async(req, res) => {
        
      try{
        const usercount = await user.countDocuments();
        const blogcount = await post.countDocuments({ deleted: false }); 
          const users= await user.find()
          const blog= await post.find({deleted:false}).populate("user","username")
          res.render("dashboard",{users,blog,usercount,blogcount})
      }catch(error){
        res.status(404).render("error",{message:"No list Founded"})
       }

  };


exports.editadmin=async(req,res)=>{
    try{
        const blog=await post.findById(req.params.id);
        if(!blog){
          return res.status(404).render("error",{message:"blog not founded"})
        }
        if (req.user.role !== "admin" && req.user._id.toString() !== blog.author.toString()) {
            return res.status(404).send("Access Denied: You cannot edit this blogzzzzzzzzzz.");
        }
        res.render('edit',{blog})   
    }catch(error){
        res.status(404).render("error",{message:"Unauthorized You cant edit thid blog"})
    }
}



exports.editpostadmin=async(req,res)=>{
    try{
        const {title,content}=req.body;
         const blog=await post.findById(req.params.id);
                 if(!blog){
                  return res.status(404).send("Blog not founded")
                 }
                 
                 await post.findByIdAndUpdate(req.params.id, { title, content });
                 res.redirect("/admin")
          }catch(error){
            res.status(404).render("error",{message:"blog not founded"})
           }
}



exports.deleteadmin=async(req,res)=>{
    try{
        await post.findByIdAndUpdate(req.params.id, { deleted: true });
        res.redirect("/admin")

    } catch (error) {
        console.error(error)
        res.status(404).render("error", { message: "Server error, please try again later." });
    }
}


exports.block=async(req,res)=>{
    try{
    const User=await user.findById(req.params.id)
    User.blocked=!User.blocked;
    await User.save();
    res.redirect('/admin')
    }catch (error) {
        console.error(error)
        res.status(404).render("error", { message: "Server error, please try again later." });
    }
}


