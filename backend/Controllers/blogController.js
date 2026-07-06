const Blog = require('../models/blog');

// create blog
const createBlog = async (req, res) => {

    try {

        const { title, content } = req.body;

        const newBlog = new Blog({
            title,
            content,
            image: req.file ? req.file.path : "",
            author: req.user.id
        });

        await newBlog.save();

        res.status(201).json({
            message: "Blog created successfully",
            newBlog
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// get all blogs
const getAllBlogs = async (req, res) => {

    try {

        const blogs = await Blog.find()
            .populate("author", "name email");

        res.status(200).json(blogs);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};


// get single blog
const getSingleBlog = async (req, res) => {

    try {

        const blog = await Blog.findById(req.params.id).populate("author", "name email");

        if (!blog) {

            return res.status(404).json({
                message: "Blog not found"
            });

        }

        res.status(200).json(blog);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};


// update blog
const updateBlog = async (req, res) => {
    try {

        const { title, content } = req.body;

        const blog = await Blog.findById(req.params.id);

        // Check if blog exists
        if (!blog) {
            return res.status(404).json({
                message: "Blog not found"
            });
        }

        
        if (blog.author.toString() !== req.user.id) {
            return res.status(403).json({
                message: "You are not authorized to update this blog"
            });
        }

        // Update blog
        blog.title = title || blog.title;
        blog.content = content || blog.content;

        // Agar image update bhi karni ho
        if (req.file) {
            blog.image = req.file.path;
        }

        await blog.save();

        res.status(200).json({
            message: "Blog updated successfully",
            blog
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};
// Delete Blog
const deleteBlog = async (req, res) => {

    try {

        const blog = await Blog.findById(req.params.id);

        if (!blog) {
            return res.status(404).json({
                message: "Blog not found"
            });
        }

        if (blog.author.toString() !== req.user.id) {
            return res.status(403).json({
                message: "You are not authorized to delete this blog"
            });
        }

        await Blog.findByIdAndDelete(req.params.id);

        res.status(200).json({
            message: "Blog deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// Like Blog
const likeBlog = async (req, res) => {

    try {

        const blog = await Blog.findById(req.params.id);

        if (!blog) {

            return res.status(404).json({
                message: "Blog not found"
            });

        }

        blog.likes += 1;

        await blog.save();

        res.status(200).json({
            message: "Blog liked",
            likes: blog.likes
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};
const addComment = async (req, res) => {

    try {

        console.log(req.params.id);

        const { text } = req.body;

        const blog = await Blog.findById(req.params.id);

        if (!blog) {

            return res.status(404).json({
                message: "Blog not found"
            });

        }

        blog.comments.push({
            text,
            user: req.user.id
        });

        await blog.save();

        res.status(200).json({
            message: "Comment Added"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: error.message
        });

    }

};

const getMyBlogs = async (req, res) => {
    try {

        const blogs = await Blog.find({
            author: req.user.id
        });

        res.status(200).json(blogs);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};



module.exports = {
    createBlog,
    getAllBlogs,
    getSingleBlog,
    updateBlog,
    deleteBlog,
    likeBlog,
    addComment,
    getMyBlogs
};