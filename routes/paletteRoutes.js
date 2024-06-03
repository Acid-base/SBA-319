// filename: routes/paletteRoutes.js

const express = require('express');
const router = express.Router();
const Palette = require('../models/Palette'); // Import Mongoose Palette model
const { body, validationResult } = require('express-validator'); // Import express-validator

// Define a function to retrieve all palettes
const getAllPalettes = async (req, res) => {
  console.log('GET /palettes - Request received');
  try {
    const palettes = await Palette.find();
    console.log('GET /palettes - Palettes found:', palettes);
    //respond with the view that will render the colors
    res.render('palettes', { palettes: palettes, title: 'Palettes' }); 
    // res.status(200).json(palettes);
  } catch (error) {
    console.error('GET /palettes - Error:', error);
    res.status(500).json({ error: 'Failed to retrieve palettes' });
  }
};

// Define a function to retrieve a specific palette by ID
const getPaletteById = async (req, res) => {
  const paletteId = req.params.id;
  console.log(`GET /palettes/${paletteId} - Request received`);
  try {
    const palette = await Palette.findById(paletteId);
    console.log(`GET /palettes/${paletteId} - Palette found:`, palette);
    res.status(200).json(palette);
  } catch (error) {
    console.error(`GET /palettes/${paletteId} - Error:`, error);
    res.status(404).json({ error: 'Palette not found' });
  }
};

// Define a function to update a palette by ID
const updatePalette = async (req, res) => {
  const paletteId = req.params.id;
  console.log(`PATCH /palettes/${paletteId} - Request received`);
  console.log(`PATCH /palettes/${paletteId} - Request Body:`, req.body);

  try {
    const updatedPalette = await Palette.findByIdAndUpdate(paletteId, req.body, { new: true });
    console.log(`PATCH /palettes/${paletteId} - Palette updated:`, updatedPalette);
    res.status(200).json(updatedPalette);
  } catch (error) {
    console.error(`PATCH /palettes/${paletteId} - Error:`, error);
    res.status(404).json({ error: 'Palette not found' });
  }
};

// Define a function to delete a palette by ID
const deletePalette = async (req, res) => {
  const paletteId = req.params.id;
  console.log(`DELETE /palettes/${paletteId} - Request received`);
  try {
    const deletedPalette = await Palette.findByIdAndDelete(paletteId);
    console.log(`DELETE /palettes/${paletteId} - Palette deleted:`, deletedPalette);
    res.status(204).send(); 
  } catch (error) {
    console.error(`DELETE /palettes/${paletteId} - Error:`, error);
    res.status(404).json({ error: 'Palette not found' });
  }
};

// Define a function to create a new palette
const createPalette = async (req, res) => {
  console.log('POST /palettes - Request received');
  console.log('POST /palettes - Request Body:', req.body);

  try {
    // Validate request body using express-validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Create a new Palette object
    const newPalette = new Palette(req.body);
    console.log('POST /palettes - New Palette Object:', newPalette);

    // Save the new palette to the database
    const savedPalette = await newPalette.save();
    console.log('POST /palettes - Palette saved:', savedPalette);

    // Send a success response with the new palette
    res.status(201).json(savedPalette);
  } catch (error) {
    console.error('POST /palettes - Error:', error);
    res.status(500).json({ error: 'Failed to create palette' });
  }
};

// Define the routes for the palette controller
router.get('/', getAllPalettes); // Get all palettes
router.get('/:id', getPaletteById); // Get a palette by ID
router.patch('/:id', updatePalette); // Update a palette by ID
router.delete('/:id', deletePalette); // Delete a palette by ID

// Create a new palette with validation
router.post('/',
  body('name').isString().notEmpty().withMessage('Name is required'),
  body('colors').isArray({ min: 1 }).withMessage('Colors must be an array of at least one color').custom((value) => {
    if (!value.every((color) => /^[#]?[0-9A-Fa-f]{6}$/.test(color))) {
      throw new Error('Colors must be an array of valid hex color codes (e.g., #FFFFFF)');
    }
    return true;
  }),
  body('creatorID').isMongoId().withMessage('creatorID must be a valid MongoDB ID'),
  createPalette
); 

// Export the router instance
module.exports = router;

