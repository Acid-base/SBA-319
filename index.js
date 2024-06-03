// filename: index.js
const express = require('express');
const bodyParser = require('body-parser');
const port = 3000;

// Import your database connection function
const connectDB = require('./mongodb'); // Assuming 'mongodb.js' is in the same directory
// Import route handlers 
const userRoutes = require('./routes/userRoutes'); 
const postRoutes = require('./routes/postRoutes'); 
const paletteRoutes = require('./routes/paletteRoutes'); 
const { notFound, errorHandler } = require('./utilities/errorHandler'); // Import error handling middleware

// Create the Express app instance
const app = express();

// Connect to the database before starting the server
connectDB()
  .then(() => {
    // Set up view engine
    app.set('view engine', 'ejs');
    app.set('views', './views');

    // Middleware
    app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies
    app.use(bodyParser.json()); // Parse JSON bodies
    app.use(express.static('public')); // Serve static files from the 'public' directory

    // Logging middleware
    app.use((req, res, next) => {
      const time = new Date();

      console.log(
        `-----
${time.toLocaleTimeString()}: Received a ${req.method} request to ${req.url}.`
      );
      if (Object.keys(req.body).length > 0) {
        console.log("Containing the data:");
        console.log(`${JSON.stringify(req.body)}`);
      }
      next();
    });

    // Root route (renders the index view)
    app.get('/', (req, res) => {
      res.render('index', { title: 'My Simple Social API' });
    });

    // Mount other routes
    app.use('/users', userRoutes); // Mount user routes
    app.use('/posts', postRoutes); // Mount post routes
    app.use('/palettes', paletteRoutes); // Mount palette routes

    // 404 handler
    app.use(notFound);

    // Error handling middleware
    app.use(errorHandler);

    // Start the server
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  })
  .catch(err => {
    console.error('Failed to connect to database:', err);
  });
