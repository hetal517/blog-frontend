const express =require('express');
const router = express.Router();
const protect = require('../middleware/authmiddleware');
const upload = require('../middleware/upload');

const {createBlog , getAllBlogs , getSingleBlog , updateBlog , deleteBlog , likeBlog , addComment, getMyBlogs}  = require('../Controllers/blogController');

router.post('/create',protect , upload.single('image'),createBlog);
router.get('/all', getAllBlogs);
router.get('/single/:id',getSingleBlog);
router.put('/update/:id',updateBlog);
router.delete('/delete/:id',deleteBlog);
router.put('/like/:id', likeBlog);
router.post('/comment/:id',protect , addComment);
router.get('/myblogs', protect , getMyBlogs);


module.exports = router;