const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// Lấy tất cả các bài viết
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Tạo bài viết mới
router.post('/', async (req, res) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });

  try {
    const newPost = await post.save();
    res.status(201).json(newPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


router.put('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    post.title = req.body.title || post.title;
    post.content = req.body.content || post.content;

    const updatedPost = await post.save();
    res.json(updatedPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


// router.delete('/:id', async (req, res) => {
//   try {
//     const post = await Post.findById(req.params.id);
//     if (!post) return res.status(404).json({ message: 'Post not found' });

//     await post.remove();
//     res.json({ message: 'Post deleted' });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Post.findByIdAndDelete(id); 
    if (result) {
      res.status(200).json({ message: 'Post deleted successfully' });
    } else {
      res.status(404).json({ message: 'Post not found' });
    }
  } catch (error) {
    console.error('Error deleting post:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});
module.exports = router;
