const express = require('express');
const router = express.Router();
const users = require('../data/users');
const { body, validationResult } = require('express-validator');

router.get('/', (req, res) => {
    res.render('users', { users: users, title: 'Users' }); 
});

router.get('/:id', (req, res) => { 
    // ... logic to fetch and render a single user 
    const user = users.find((user) => user.id == req.params.id)
    if (user) {
        res.render('user', { user: user, title: 'User' }); // Assuming you have a 'user' view
    }
    else {
        res.status(404).send('User not found'); 
    }
});

// Route to display a form for creating a new user
router.get('/new', (req, res) => {
  res.render('newUserForm'); // Render a view with a form
});
// POST route with validation logic 
router.post('/', 
    body('name').isString().notEmpty().withMessage('Name is required'),
    body('username').isString().notEmpty().withMessage('Username is required').isLength({ min: 4 }).withMessage('Username must be at least 4 characters long'),
    body('email').isEmail().normalizeEmail().withMessage('Invalid email format'),
    (req, res) => {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() }); 
        }

        if (req.body.name && req.body.username && req.body.email) {
            const foundUser = users.find((u) => u.username == req.body.username)
    
            if (foundUser) {
                return res.status(400).json({ error: "Username Already Taken" });
            }

            const user = {
                id: users[users.length - 1].id + 1,
                name: req.body.name,
                username: req.body.username,
                email: req.body.email,
            };
            users.push(user);
            // Redirect to the newly created user page
            res.redirect(`/users/${user.id}`); 
        } else {
            return res.status(400).json({ error: "Insufficient Data" });
        }
    }
);

// ... add other user routes (PUT)

// DELETE route with query parameter filtering 
router.delete('/', (req, res, next) => {
    const username = req.query.username;

    if (username) { 
        const userIndex = users.findIndex((u) => u.username === username);

        if (userIndex !== -1) {
            users.splice(userIndex, 1);
            res.status(204).send(); // 204 No Content 
        } else {
            next({ status: 404, message: 'User not found' }); // Error handled by middleware
        }
    } else {
        next({ status: 400, message: 'Username query parameter is required for deletion.' }); 
    }
});
module.exports = router; 
