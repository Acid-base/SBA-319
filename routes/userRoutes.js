
// filename: routes/userRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator'); // Import validation library

// GET all users
router.get('/', async (req, res) => {
  try {
    console.log('GET /users - Request received');
    // Find all users in the database
    const users = await User.find();
    console.log('GET /users - Users found:', users);
    // Render the 'users' view and pass the users data to the view
    res.render('users', { users: users, title: 'Users' });
  } catch (error) {
    console.error('GET /users - Error:', error);
    // Send a 500 status code and a JSON response indicating the error
    res.status(500).json({ error: 'Failed to retrieve users' });
  }
});

// GET a specific user by ID
router.get('/:id', async (req, res) => {
  const userId = req.params.id;
  console.log(`GET /users/${userId} - Request received`);
  try {
    // Find a user by their ID
    const user = await User.findById(userId);
    console.log(`GET /users/${userId} - User found:`, user);
    // Render the 'user' view and pass the user data to the view
    res.render('user', { user: user, title: 'User' });
  } catch (error) {
    console.error(`GET /users/${userId} - Error:`, error);
    // Send a 404 status code if the user is not found
    res.status(404).send('User not found');
  }
});

// Route to display a form for creating a new user
router.get('/new', (req, res) => {
  console.log('GET /users/new - Request received');
  // Render the 'newUserForm' view
  res.render('newUserForm');
});

// POST a new user with validation
router.post('/',
    // Validate the request body
    body('name').isString().notEmpty().withMessage('Name is required'),
    body('username').isString().notEmpty().withMessage('Username is required').isLength({ min: 4 }).withMessage('Username must be at least 4 characters long'),
    body('email').isEmail().normalizeEmail().withMessage('Invalid email format'),
    async (req, res) => {
        console.log('POST /users - Request received');
        console.log('POST /users - Request Body:', req.body);
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log('POST /users - Validation Errors:', errors.array());
            // Return a 400 status code and a JSON response containing the validation errors
            return res.status(400).json({ errors: errors.array() });
        }
        // Check if the required fields are present in the request body
        if (req.body.name && req.body.username && req.body.email) {
            try {
              // Create a new user instance with the data from the request body
              const newUser = new User(req.body);
              console.log('POST /users - New User Object:', newUser);
              // Save the new user to the database
              const savedUser = await newUser.save();
              console.log('POST /users - User saved:', savedUser);
              // Redirect to the user's profile page after successful creation
              res.redirect(`/users/${savedUser.id}`);
            } catch (error) {
              console.error('POST /users - Error:', error);
              // Check if the error is a duplicate key error (e.g., username or email already exists)
              if (error.code === 11000) {
                return res.status(400).json({ error: "Username or email already taken." });
              }
              // Send a 500 status code and a JSON response indicating the error
              res.status(500).json({ error: 'Failed to create user' });
            }
        } else {
            // Return a 400 status code and a JSON response indicating insufficient data
            return res.status(400).json({ error: "Insufficient Data" });
        }
    }
);

// DELETE a specific user by username
router.delete('/', async (req, res) => {
  const username = req.query.username;
  console.log('DELETE /users - Request received');
  console.log('DELETE /users - Username:', username);

  if (username) {
    try {
      // Find a user by their username and delete them from the database
      const deletedUser = await User.findOneAndDelete({ username: username });
      console.log('DELETE /users - User deleted:', deletedUser);
      // Send a 204 No Content status code after successful deletion
      res.status(204).send();
    } catch (error) {
      console.error('DELETE /users - Error:', error);
      // Send a 404 status code if the user is not found
      res.status(404).json({ error: 'User not found' });
    }
  } else {
    // Return a 400 status code and a JSON response if the username query parameter is missing
    res.status(400).json({ error: 'Username query parameter is required for deletion.' });
  }
});

module.exports = router;
