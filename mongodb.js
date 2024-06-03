const mongoose = require('mongoose');

const uri = 'mongodb+srv://danieljoyates:bPYYndSumff5ODOX@cluster0.geumzfg.mongodb.net/';

mongoose.connect(uri, { /* No need for useNewUrlParser or useUnifiedTopology */ }) 
  .then(() => {
    console.log('Connected to MongoDB Atlas');
  })
  .catch(err => {
    console.error('Error connecting to MongoDB Atlas:', err);
  });

// Define your models (Palette, Post, User) here (you already have them)
const Palette = require('./models/Palette');
const Post = require('./models/Post');
const User = require('./models/User');

// Create the collections (if they don't exist)
async function createCollections() {
  try {
    await Palette.createCollection();
    console.log('Palette collection created.');

    await Post.createCollection();
    console.log('Post collection created.');

    await User.createCollection();
    console.log('User collection created.');
  } catch (err) {
    if (err.code === 11000) {
      console.log('Collections already exist.');
    } else {
      console.error('Error creating collections:', err);
    }
  }
}

createCollections();
