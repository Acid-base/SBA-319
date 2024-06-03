// models/User.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true, // Ensures usernames are unique
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensures emails are unique
    validate: {
      validator: function (value) { 
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      },
      message: props => `${props.value} is not a valid email address!`
    }
  },
});

const User = mongoose.model('User', UserSchema);

module.exports = User;

