const express = require('express');
const router = express.Router();
const Blog = require('../models/blog');

// Add new blog
router.post('/', async (req, res) => {
  const blog = new Blog({
    title: req.body.title,
    sub_title: req.body.sub_title,
    content: req.body.content,
    slug: req.body.slug,
    tags: req.body.tags,
    author: req.body.author,
    created_date: new Date(),
    modified_date: new Date(),
  });

  try {
    const newBlog = await blog.save();
    res.status(201).json(newBlog);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// List blogs with pagination
router.get('/', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const results = {};
  results.totalCount = await Blog.countDocuments().exec();

  if (endIndex < results.totalCount) {
    results.next = {
      page: page + 1,
      limit: limit,
    };
  }

  if (startIndex > 0) {
    results.previous = {
      page: page - 1,
      limit: limit,
    };
  }

  try {
    results.results = await Blog.find()
      .sort({ created_date: -1 })
      .limit(limit)
      .skip(startIndex)
      .populate('author', '-_id -__v -password')
      .exec();
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get blog by tags
router.get('/tags/:tag', async (req, res) => {
  try {
    const blogs = await Blog.find({ tags: req.params.tag })
      .populate('author', '-_id -__v -password')
      .exec();
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update blog by ID
router.patch('/:id', async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
