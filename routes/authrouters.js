const express = require("express");
const authController = require("../controllers/authController");
const router = express.Router();
const { requireGuest } = require("../middleware/authmiddleware");





router.get("/",requireGuest, authController.getSignup);
router.post("/signup",requireGuest, authController.postSignup);

router.get("/login",requireGuest, authController.getLogin);
router.post("/login",requireGuest,authController.postLogin);



router.get("/logout",authController.logout)




module.exports = router;



