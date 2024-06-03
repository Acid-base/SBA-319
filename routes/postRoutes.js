
// filename: routes/postRoutes.js
const express = require('express');
const router = express.Router();
const Post = require('../models/Post'); // Import Mongoose Post model
const { body, validationResult } = require('express-validator'); // Import validation library

// GET all posts (using Mongoose)
router.get('/', async (req, res) => {
  try {
    console.log('GET /posts - Request received');
    const posts = await Post.find(); // find() retrieves all documents from Post collection
    console.log('GET /posts - Posts found:', posts);
    res.json(posts);
  } catch (error) {
    console.error('GET /posts - Error:', error);
    res.status(500).json({ error: 'Failed to retrieve posts' });
  }
});

// POST a new post (using Mongoose)
router.post('/',
  // Input validation using express-validator
  body('userId').isMongoId().withMessage('userId must be a valid MongoDB ID'),
  body('title').isString().notEmpty().withMessage('Title is required'),
  body('content').isString().notEmpty().withMessage('Content is required'),
  body('paletteId').isMongoId().withMessage('paletteId must be a valid MongoDB ID'),
  async (req, res) => {
    console.log('POST /posts - Request received');
    console.log('POST /posts - Request Body:', req.body);

    const errors = validationResult(req); // Check for validation errors
    if (!errors.isEmpty()) {
      console.log('POST /posts - Validation Errors:', errors.array());
      return res.status(400).json({ errors: errors.array() }); // Return errors as JSON
    }

    try {
      const newPost = new Post(req.body); // Create new post instance
      console.log('POST /posts - New Post Object:', newPost);
      const savedPost = await newPost.save(); // Save to MongoDB
      console.log('POST /posts - Post saved:', savedPost);
      res.status(201).json(savedPost); // Send saved post as JSON
    } catch (error) {
      console.error('POST /posts - Error:', error);
      res.status(500).json({ error: 'Failed to create post' });
    }
  }
);

// GET a specific post by ID (using Mongoose)
router.get('/:id', async (req, res) => {
  const postId = req.params.id; // Get ID from the request params
  console.log(`GET /posts/${postId} - Request received`);

  try {
    const post = await Post.findById(postId); // Find a single document by its _id
    console.log(`GET /posts/${postId} - Post found:`, post);
    res.json(post); // Respond with the found post as JSON
  } catch (error) {
    console.error(`GET /posts/${postId} - Error:`, error);
    res.status(500).json({ error: 'Failed to retrieve post' });
  }
});

// PATCH (Update) a specific post by ID (using Mongoose)
router.patch('/:id',
  // Input validation for optional fields
  body('title').optional().isString().notEmpty().withMessage('Title is required'),
  body('content').optional().isString().notEmpty().withMessage('Content is required'),
  async (req, res) => {
    const postId = req.params.id;
    console.log(`PATCH /posts/${postId} - Request received`);
    console.log(`PATCH /posts/${postId} - Request Body:`, req.body);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(`PATCH /posts/${postId} - Validation Errors:`, errors.array());
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const updatedPost = await Post.findByIdAndUpdate(postId, req.body, { new: true });
      // Find by ID and update, { new: true } returns the updated document
      console.log(`PATCH /posts/${postId} - Post updated:`, updatedPost);
      res.json(updatedPost); // Respond with the updated post
    } catch (error) {
      console.error(`PATCH /posts/${postId} - Error:`, error);
      res.status(500).json({ error: 'Failed to update post' });
    }
  }
);

// DELETE a specific post by ID (using Mongoose)
router.delete('/:id', async (req, res) => {
  const postId = req.params.id;
  console.log(`DELETE /posts/${postId} - Request received`);

  try {
    const deletedPost = await Post.findByIdAndDelete(postId);
    // Find by ID and remove from MongoDB
    console.log(`DELETE /posts/${postId} - Post deleted:`, deletedPost);
    res.status(204).send(); // 204 No Content success status response code
  } catch (error) {
    console.error(`DELETE /posts/${postId} - Error:`, error);
    res.status(500).json({ error: 'Failed to delete post' });
  }
});

module.exports = router;

