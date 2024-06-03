// filename: routes/paletteRoutes.js

const express = require('express');
const router = express.Router();
const palettes = require('../data/palettes');

// Define a function to retrieve all palettes
const getAllPalettes = (req, res) => {
  res.status(200).json(palettes);
};

// Define a function to retrieve a specific palette by ID
const getPaletteById = (req, res) => {
  const paletteId = parseInt(req.params.id); 
  const palette = palettes.find((p) => p.id === paletteId);

  if (palette) {
    res.status(200).json(palette);
  } else {
    res.status(404).json({ error: 'Palette not found' });
  }
};

// Define a function to update a palette by ID
const updatePalette = (req, res) => {
  const paletteId = parseInt(req.params.id);
  const paletteIndex = palettes.findIndex((p) => p.id === paletteId);

  if (paletteIndex !== -1) {
    const { name, colors } = req.body;
    palettes[paletteIndex].name = name || palettes[paletteIndex].name;
    palettes[paletteIndex].colors = colors || palettes[paletteIndex].colors;

    res.status(200).json(palettes[paletteIndex]);
  } else {
    res.status(404).json({ error: 'Palette not found' });
  }
};

// Define a function to delete a palette by ID
const deletePalette = (req, res) => {
  const paletteId = parseInt(req.params.id);
  const paletteIndex = palettes.findIndex((p) => p.id === paletteId);

  if (paletteIndex !== -1) {
    const deletedPalette = palettes.splice(paletteIndex, 1)[0];
    res.status(204).send(); 
  } else {
    res.status(404).json({ error: 'Palette not found' });
  }
};

// Define the routes for the palette controller
router.get('/', getAllPalettes); // Get all palettes
router.get('/:id', getPaletteById); // Get a palette by ID
router.patch('/:id', updatePalette); // Update a palette by ID
router.delete('/:id', deletePalette); // Delete a palette by ID

// Export the router instance
module.exports = router;
