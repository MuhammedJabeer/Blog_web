const express = require("express");
const router = express.Router();
const admin=require("../controllers/adminController")

const {requireAdmin}=require("../middleware/authmiddleware")



router.get("/admin",requireAdmin,admin.getadmin)
router.get("/edit/:id",requireAdmin,admin.editadmin)
router.post("/edit/:id",requireAdmin,admin.editpostadmin);
router.post('/delete/:id',requireAdmin,admin.deleteadmin)
router.post('/block/:id',requireAdmin,admin.block)
module.exports = router;