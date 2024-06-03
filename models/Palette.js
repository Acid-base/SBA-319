// models/Palette.js
const mongoose = require('mongoose');

const PaletteSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  colors: {
    type: [String], // Array of hex color codes
    required: true,
    validate: {
      validator: function (value) {
        return value.every((color) => /^[#]?[0-9A-Fa-f]{6}$/.test(color));
      },
      message: props => `${props.value} is not a valid array of hex color codes!`
    }
  },
  creatorID: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', // Reference to the User model
    required: true,
  },
});

const Palette = mongoose.model('Palette', PaletteSchema);

module.exports = Palette;
