const express = require('express');
const bodyParser = require('body-parser');
const port = 3000;

// Import route handlers 
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const paletteRoutes = require('./routes/paletteRoutes');
const { notFound, errorHandler } = require('./utilities/errorHandler');

// Create the Express app instance
const app = express();
// Set up view engine
app.set('view engine', 'ejs');
app.set('views', './views');

// Middleware
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.json());
app.use(express.static('public'));

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

// Routes
app.get('/', (req, res) => {
  res.render('index', { title: 'My Simple Social API' });
});

// Mount other routes
app.use('/users', userRoutes);
app.use('/posts', postRoutes);
app.use('/palettes', paletteRoutes);

// 404 handler
app.use(notFound);

// Error handling middleware
app.use(errorHandler);

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
