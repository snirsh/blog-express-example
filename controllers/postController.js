const asyncHandler = require('express-async-handler');
const postModel = require('../models/post');

const getPosts = asyncHandler(async (req, res) => {
    const posts = postModel.getPosts();
    res.json(posts);
});

const getPostByTitle = asyncHandler(async (req, res) => {
    const post = postModel.getPostByTitle(req.query.title);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json(post);
});

const addPost = asyncHandler(async (req, res) => {
    const newPost = postModel.addPost(req.body);
    res.status(201).json(newPost);
});

const updatePost = asyncHandler(async (req, res) => {
    const updatedPost = postModel.updatePost(parseInt(req.params.id), req.body);
    if (!updatedPost) return res.status(404).json({ message: 'Post not found' });
    res.json(updatedPost);
});

const deletePost = asyncHandler(async (req, res) => {
    const deletedPostId = postModel.deletePost(parseInt(req.params.id));
    if (!deletedPostId) return res.status(404).json({ message: 'Post not found' });
    res.json({ message: `Post ${deletedPostId} deleted` });
});

module.exports = {
    getPosts,
    getPostByTitle,
    addPost,
    updatePost,
    deletePost,
};
