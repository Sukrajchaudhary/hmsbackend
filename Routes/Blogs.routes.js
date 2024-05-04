const express = require("express");
const multer = require("multer");
const router = express.Router();
const {
  CreateBlogs,
  GetblogById,
  UpdateBlogById,
  deleteBlogById,
  getAllblog,
} = require("../Controllers/Blogs.controllers")
const storage = multer.memoryStorage();
const upload = multer({ storage: storage, fieldname: "image" });
router
  .post("/admin/blog/create", upload.single("image"), CreateBlogs)
  .get("/admin/blog/:id", GetblogById)
  .patch("/admin/update/:id", UpdateBlogById)
  .delete("/admin/blog/:id", deleteBlogById)
  .get("/admin/blog", getAllblog);
exports.router = router;
