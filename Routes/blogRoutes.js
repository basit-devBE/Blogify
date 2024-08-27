import express from "express"
import  { LoggedIn } from '../Middlewares/isLoggedIn.js';
import { createBlog, fetchblogPost } from "../Controllers/blog.js";

const BlogRouter = express.Router();

BlogRouter.post("/api/v1/blog/create" ,LoggedIn,createBlog)
BlogRouter.get("/api/blog/:id", fetchblogPost)

export default BlogRouter