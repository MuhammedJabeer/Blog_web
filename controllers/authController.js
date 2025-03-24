const User = require("../models/users");
const bcrypt = require("bcrypt");
const jwt=require('jsonwebtoken');
const { token } = require("morgan");
// const blog=require('../models/post')

const SECRET_KEY = process.env.JWT_SECRET || "yourSecretKey";


exports.getSignup = (req, res) => {
  res.render("signup");
};


exports.postSignup = async (req, res) => {
  try {

    const existingUser = await User.findOne( {email:req.body.email} );
    if (existingUser) {
      return res.render("signup", { error: "Email already in use" });
    }


    const hashedPassword= await bcrypt.hash(req.body.password, 10);
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword, 
      role: "user",
    });

    await user.save();
    res.redirect("/login");
  } catch (error) {
    res.status(404).render("error",{message:"Error signing up"});
  }
};

exports.getLogin = (req, res) => {
 
  res.render("login");
};

exports.postLogin = async (req, res) => {
    try {
      const { email, password } = req.body;
      console.log("Login attempt for:", email); 
  
      const user = await User.findOne({ email }); 
  
      if (!user) {
     
       return res.render("login", { error: "Invalid Email " });
      }
      if (user.blocked) {
        return res.render("login", { error: "You Are Blocked" });
    }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
       
        return res.render("login", { error: "Invalid  password" });
      }


      const token = jwt.sign({ id: user._id, role: user.role }, SECRET_KEY, {
        expiresIn: "1h",
      });

      res.cookie("token", token, { httpOnly: true });

      res.redirect("/home");

    } catch (error) {
      console.error("Error in login:", error);
      res.status(404).render("error",{message:"Error logging in"});
    }
  };

  

  exports.logout = (req, res) => {
    res.clearCookie("token"); 
    res.redirect("/login"); 
  };