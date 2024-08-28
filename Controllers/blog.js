import expressAsyncHandler from "express-async-handler";
import Blog from "../Models/BlogModel.js";

export const createBlog = expressAsyncHandler(async (req, res, next) => {
    const { title, content } = req.body;

    if (!title || !content) {
        return res.json({
            msg: "Please fill all the important fields"
        });
    }

    const BlogExists = await Blog.findOne({ title });
    if (BlogExists) {
        return res.json({
            msg: "A similar Blog already exists"
        });
    }

    try {
        const blog = await Blog.create({
            title,
            content,
            User: req.userAuthId,
        });

        return res.json({
            status: 200,
            msg: "Blog created successfully",
            blog
        });
    } catch (error) {
        next(error);
    }
});

export const fetchblogPost = expressAsyncHandler(async (req, res, next) => {
    const { id } = req.params;

    const blog = await Blog.findById(id);
    if (!blog) {
        return res.json({ status: 201, msg: "The blog you requested for cannot be found" });
    }
    res.json({
        msg: "Blog found successfully",
        blog
    });
});

export const UpdateBlog = expressAsyncHandler(async (req, res, next) => {
    const { id } = req.params;

    const BlogFound = await Blog.findById(id);

    if (!BlogFound) {
        return res.json({
            msg: "The blog you requested for cannot be found"
        });
    }

    try {
        const { title, content } = req.body;
        const UpdatedBlog = await Blog.findByIdAndUpdate(
            id,
            { title, content },
            { new: true } // returns the updated document
        );

        res.json({
            msg: "Blog updated successfully",
            blog: UpdatedBlog
        });
    } catch (error) {
        next(error);
    }
});

// Fetch all Blog Posts
export const fetchAllBlogPosts = expressAsyncHandler(async (req, res, next) => {
    try {
        const blogs = await Blog.find({});
        res.json({
            msg: "All blogs fetched successfully",
            blogs
        });
    } catch (error) {
        next(error);
    }
});
