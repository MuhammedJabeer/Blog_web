const Blog=require('../models/post')
const fs=require("fs")
const path=require("path")
   

exports.gethome = (req, res) => {
    res.render("home");
  };


exports.getcreate=(req,res)=>{
  res.render('create')
}



exports.postcreate=async (req,res)=>{
      try{
        const { title, content } = req.body;
        const image = req.file ? req.file.filename : null;
        const blog=new Blog({
          title,
          content,
          image,
          user: req.user.id
        });
         await blog.save()
         res.redirect("/list")
      }catch(error){
        console.error(error)
        res.status(404).render("Error",{message:"error"});
      }
}


exports.listblog = async (req, res) => {
     try{
      const blog=await Blog.find({deleted:false}).populate("user","username");
      console.log(blog.image);
      res.render("list",{blog})
     }catch(error){
      res.status(404).render("error",{message:"No list Founded"})
     }
};

exports.myblog = async (req, res) => {
  try{
   const blog=await Blog.find({user:req.user.id,deleted:false})
   res.render("myblog",{blog})
  }catch(error){
   res.status(404).render("error",{message:"No list Founded"})
  }
};



exports.editblog= async(req, res) => {
     try{
         const blog=await Blog.findById(req.params.id);
         if(!blog){
          return res.status(404).send("Blog not founded")
         }
         if (blog.user.toString() !== req.user.id && req.user.role !=="admin") {
          return res.status(404).render("error",{message:"Unauthorized: You can't edit this blog"});
      }
      //  if (req.user.role !== "admin" && req.user._id.toString() !== blog.user.toString()) {
      //       return res.status(403).send("Access Denied: You cannot edit this blog.");
      //   }
      res.render('edit',{blog})
     }catch(error){
      res.status(404).render("error",{message:"Unauthorized You can't edit this blog"})
     }
};


// exports.editPost=async(req,res)=>{
//   try{
//     const {title,content}=req.body;
//     const blog=await Blog.findById(req.params.id);
//          if(!blog){
//           return res.status(500).send("Blog not founded")
//          }

//          if (req.file) {
//           console.log("New image uploaded:", req.file.filename);

//           if (blog.image && blog.image !== "images/default-blog.jpg") {
//               const oldImagePath = path.join(__dirname, "..", "public", blog.image);
//               if (fs.existsSync(oldImagePath)) {
//                   console.log("Deleting old image:", oldImagePath);
//                   fs.unlinkSync(oldImagePath); 
//               }
//           }

//           images = `images/${req.file.filename}`;
//       }
         
//          await Blog.findByIdAndUpdate(req.params.id, { title, content,image:images });
//          res.redirect("/list")
//   }catch(error){
//     res.status(500).render("error",{message:"blog not founded"})
//    }
// };





exports.editPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).send("Blog not found");
    }

    let updatedImage = blog.image;

    if (req.file) {
      console.log("New image uploaded:", req.file.filename);
      updatedImage = req.file.filename;
      
      if (blog.image && blog.image !== "/images/default-blog.jpg") {
        const oldImagePath = path.join(__dirname, "..", "public", blog.image);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
    }

    await Blog.findByIdAndUpdate(req.params.id, {
      title,
      content,
      image: updatedImage, 
    });

    res.redirect("/list");
  } catch (error) {
    console.error("Error updating blog:", error);
    res.status(404).render("error", { message: "Error updating blog" });
  }
};




exports.deleteblog = async (req, res) => {
  try {
    const blog=await Blog.findById(req.params.id);
    blog.deleted = true;
    await blog.save();
    res.redirect("/myblog");
  } catch (error) {
      console.error("Error deleting blog:", error);
      res.status(404).render("error", { message: "Server error, please try again later." });
  }
};

