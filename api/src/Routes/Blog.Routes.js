import express from "express";
import {
  addBlog,
  deleteBlog,
  editBlog,
  getAllBlog,
  getBlog,
  getBlogByCategory,
  getRelatedBlog,
  search,
  showAllBlog,
  updateBlog,
} from "../Controllers/Blog.Controllers.js";
import upload from "../config/multer.js";
import { onlyAdminAuthenticate } from "../middleware/AdminAuthenticate.Middleware.js";
import { Authenticate } from "../middleware/Authenticate.Middleware.js";
const BlogRoute = express.Router();

BlogRoute.post("/add", upload.single("file"),onlyAdminAuthenticate, addBlog);
BlogRoute.get("/edit/:blogid",onlyAdminAuthenticate, editBlog);
BlogRoute.put("/update/:blogid", upload.single("file"),onlyAdminAuthenticate, updateBlog);
BlogRoute.delete("/delete/:blogid",onlyAdminAuthenticate, deleteBlog);
BlogRoute.get("/get-all", Authenticate , showAllBlog);
BlogRoute.get("/blogs" , getAllBlog);

BlogRoute.get("/get-blog/:slug", getBlog);
BlogRoute.get("/get-related-blog/:category/:blog", getRelatedBlog);
BlogRoute.get("/get-blog-by-category/:category", getBlogByCategory);
BlogRoute.get("/search", search);

export default BlogRoute;
