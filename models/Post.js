// models/Post.js
const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  paletteId: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Palette', // Reference to the Palette model
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', // Reference to the User model
    required: true,
  },
});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;
