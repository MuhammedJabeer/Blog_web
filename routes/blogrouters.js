const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blogController");
const { authMiddleware } = require("../middleware/authmiddleware");
const image=require('../middleware/upload')


router.use(authMiddleware);

router.get("/home", blogController.gethome);
router.get("/create", blogController.getcreate);
router.post("/create",image.single("image"), blogController.postcreate);
router.get("/list", blogController.listblog);
router.get("/edit/:id",blogController.editblog)
router.post("/edit/:id",image.single("image"),blogController.editPost);
router.get("/myblog",blogController.myblog);
router.post('/delete/:id',blogController.deleteblog);



module.exports = router;
