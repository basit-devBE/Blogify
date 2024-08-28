import express from "express"
import  { LoggedIn } from '../Middlewares/isLoggedIn.js';
import { createBlog, fetchAllBlogPosts, fetchblogPost, UpdateBlog } from "../Controllers/blog.js";
import Blog from "../Models/BlogModel.js";

const BlogRouter = express.Router();

BlogRouter.post("/api/v1/blog/create" ,LoggedIn,createBlog)
BlogRouter.get("/api/blog/:id", fetchblogPost)
BlogRouter.put("/api/blog/update/:id", LoggedIn,UpdateBlog)
BlogRouter.get("/api/Blogs", fetchAllBlogPosts)

export default BlogRouter