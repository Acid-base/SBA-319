const express = require('express');
const router = express.Router();
const posts = require('../data/posts');
const { body, validationResult } = require('express-validator');

router.get('/', (req, res) => {
    res.json(posts);
});

router.get('/userId/:userId', (req, res) => {
    let filteredPosts = posts.filter(p => p.userId == req.params.userId)
    res.json(filteredPosts)
})

router.post('/', 
    body('userId').isNumeric().withMessage('userId must be a number'),
    body('title').isString().notEmpty().withMessage('Title is required'),
    body('content').isString().notEmpty().withMessage('Content is required'),
    (req, res) => {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        if (req.body.userId && req.body.title && req.body.content) {
            const post = {
                id: posts[posts.length - 1].id + 1,
                userId: req.body.userId,
                title: req.body.title,
                content: req.body.content,
            };
  
            posts.push(post);
            res.json(posts[posts.length - 1]);
        } else {
            res.json({ error: "Insufficient Data" }); 
        }
    }
);

router.get('/:id', (req, res, next) => {
    const post = posts.find((post) => post.id == req.params.id)
    if (post) {
        res.json(post)
    } else {
        next()
    }
});

router.patch('/:id', 
    body('title').optional().isString().notEmpty().withMessage('Title is required'),
    body('content').optional().isString().notEmpty().withMessage('Content is required'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const postIndex = posts.findIndex((p) => p.id == req.params.id);

        if (postIndex !== -1) {
            // Update only if new values are provided
            if (req.body.title) {
                posts[postIndex].title = req.body.title;
            }
            if (req.body.content) {
                posts[postIndex].content = req.body.content;
            }
            res.json(posts[postIndex]);
        } else {
            next(); // Let the 404 handler deal with it
        }
    }
);
router.delete('/:id', (req, res, next) => {
    const post = posts.find((p, i) => {
        if (p.id == req.params.id) {
            posts.splice(i, 1);
            return true;
        }
    });
  
    if (post) res.json(post);
    else next();
});

module.exports = router;
