// mongodb.js
const mongoose = require('mongoose');
const uri = 'mongodb+srv://danieljoyates:bPYYndSumff5ODOX@cluster0.geumzfg.mongodb.net/'; 
const User = require('./models/User');
const Palette = require('./models/Palette');
const Post = require('./models/Post');

// Export the connectDB function
const connectDB = async () => {
  try {
    await mongoose.connect(uri, {
     
    });
    console.log('Connected to MongoDB Atlas');

    // Seed the database with sample data
    await seedDatabase(); 

    return mongoose.connection; // Optional: return the connection object
  } catch (err) {
    console.error('Error connecting to MongoDB Atlas:', err);
    process.exit(1); // Exit the process on connection error
  }
};

// Function to seed the database with sample data
async function seedDatabase() {
  // Drop existing collections (if any)
  await User.deleteMany({});
  await Palette.deleteMany({});
  await Post.deleteMany({});

  // Users
  const users = [
    {
      "name": "Alice",
      "username": "alice123",
      "email": "alice@example.com"
    },
    {
      "name": "Bob",
      "username": "bob456",
      "email": "bob@example.com"
    },
    {
      "name": "Charlie",
      "username": "charlie789",
      "email": "charlie@example.com"
    },
    {
      "name": "David",
      "username": "david101",
      "email": "david@example.com"
    },
    {
      "name": "Eve",
      "username": "eve202",
      "email": "eve@example.com"
    },
    {
      "name": "Frank",
      "username": "frank303",
      "email": "frank@example.com"
    },
    {
      "name": "Grace",
      "username": "grace404",
      "email": "grace@example.com"
    },
    {
      "name": "Henry",
      "username": "henry505",
      "email": "henry@example.com"
    },
    {
      "name": "Isabella",
      "username": "isabella606",
      "email": "isabella@example.com"
    },
    {
      "name": "Jack",
      "username": "jack707",
      "email": "jack@example.com"
    },
    {
      "name": "Katherine",
      "username": "katherine808",
      "email": "katherine@example.com"
    },
    {
      "name": "Liam",
      "username": "liam909",
      "email": "liam@example.com"
    },
    {
      "name": "Mia",
      "username": "mia1010",
      "email": "mia@example.com"
    },
    {
      "name": "Noah",
      "username": "noah2020",
      "email": "noah@example.com"
    },
    {
      "name": "Olivia",
      "username": "olivia3030",
      "email": "olivia@example.com"
    },
    {
      "name": "Peter",
      "username": "peter4040",
      "email": "peter@example.com"
    },
    {
      "name": "Quinn",
      "username": "quinn5050",
      "email": "quinn@example.com"
    },
    {
      "name": "Riley",
      "username": "riley6060",
      "email": "riley@example.com"
    },
    {
      "name": "Sophia",
      "username": "sophia7070",
      "email": "sophia@example.com"
    },
    {
      "name": "Thomas",
      "username": "thomas8080",
      "email": "thomas@example.com"
    }
  ];

  await User.insertMany(users);

  // Palettes
  const palettes = [
    {
      "name": "Sunset Hues",
      "colors": ["#FF6347", "#FFD700", "#FFA500", "#DC143C"],
      "creatorID": users[0]._id // Referencing the first user in the array
    },
    {
      "name": "Ocean Breeze",
      "colors": ["#00BFFF", "#ADD8E6", "#6495ED", "#1E90FF",
      "creatorID": users[0]._id 
    },
    {
      "name": "Forest Greens",
      "colors": ["#228B22", "#008000", "#556B2F", "#98FB98"],
      "creatorID": users[1]._id
    },
    {
      "name": "Midnight Blues",
      "colors": ["#000080", "#4169E1", "#191970", "#0000CD"],
      "creatorID": users[1]._id
    },
    {
      "name": "Citrus Burst",
      "colors": ["#FFC125", "#FFD700", "#FFA500", "#FFFAFA"],
      "creatorID": users[2]._id
    },
    {
      "name": "Warm Earths",
      "colors": ["#A0522D", "#CD853F", "#D2691E", "#8B4513"],
      "creatorID": users[2]._id
    },
    {
      "name": "Cool Grays",
      "colors": ["#D3D3D3", "#C0C0C0", "#A9A9A9", "#808080"],
      "creatorID": users[3]._id
    },
    {
      "name": "Vibrant Purples",
      "colors": ["#800080", "#9400D3", "#D8BFD8", "#DA70D6"],
      "creatorID": users[3]._id
    },
    {
      "name": "Spring Blossoms",
      "colors": ["#FF00FF", "#FF1493", "#FF69B4", "#FFC0CB"],
      "creatorID": users[4]._id
    },
    {
      "name": "Desert Sands",
      "colors": ["#F5DEB3", "#FFFFE0", "#FAEBD7", "#FFE4C4"],
      "creatorID": users[4]._id
    },
    {
      "name": "Tropical Paradise",
      "colors": ["#00FFFF", "#40E0D0", "#AFEEEE", "#00CED1"],
      "creatorID": users[5]._id
    },
    {
      "name": "Vintage Reds",
      "colors": ["#B22222", "#DC143C", "#8B0000", "#A52A2A"],
      "creatorID": users[5]._id
    },
    {
      "name": "Pastel Dreams",
      "colors": ["#FFFAFA", "#FFF0F5", "#F0FFF0", "#FAF0E6"],
      "creatorID": users[6]._id
    },
    {
      "name": "Deep Shadows",
      "colors": ["#2F4F4F", "#556B2F", "#696969", "#4682B4"],
      "creatorID": users[6]._id
    },
    {
      "name": "Autumn Blaze",
      "colors": ["#FF7F50", "#FF8C00", "#CD5C5C", "#FFA07A"],
      "creatorID": users[7]._id
    },
    {
      "name": "Electric Vibes",
      "colors": ["#FF00FF", "#FF00FF", "#FFA500", "#FFFAFA"],
      "creatorID": users[7]._id
    },
    {
      "name": "Candy Colors",
      "colors": ["#FFB6C1", "#FFC0CB", "#FFDAB9", "#FFFAFA"],
      "creatorID": users[8]._id
    },
    {
      "name": "Modern Neutrals",
      "colors": ["#F0F8FF", "#FAEBD7", "#FFF5EE", "#F5F5F5"],
      "creatorID": users[8]._id 
    },
    {
      "name": "Bold Contrasts",
      "colors": ["#000000", "#FFFFFF", "#FF0000", "#00FF00"],
      "creatorID": users[9]._id
    },
    {
      "name": "Sky and Clouds",
      "colors": ["#87CEEB", "#ADD8E6", "#F0FFFF", "#E0FFFF"],
      "creatorID": users[9]._id
    },
    {
      "name": "Sunrise Glow",
      "colors": ["#FF6347", "#FFA07A", "#FFD700", "#FFFFE0"],
      "creatorID": users[10]._id
    },
    {
      "name": "Deep Ocean",
      "colors": ["#000080", "#191970", "#4682B4", "#6495ED"],
      "creatorID": users[10]._id
    },
    {
      "name": "Cool Blues",
      "colors": ["#6495ED", "#00BFFF", "#87CEEB", "#0000CD"],
      "creatorID": users[11]._id
    },
    {
      "name": "Warm Oranges",
      "colors": ["#FFA500", "#FF8C00", "#FF7F50", "#FFC125"],
      "creatorID": users[11]._id
    },
    {
      "name": "Spring Greens",
      "colors": ["#98FB98", "#008000", "#228B22", "#ADFF2F"],
      "creatorID": users[12]._id
    },
    {
      "name": "Autumn Reds",
      "colors": ["#DC143C", "#FF7F50", "#CD5C5C", "#A52A2A"],
      "creatorID": users[12]._id
    },
    {
      "name": "Soft Pastels",
      "colors": ["#FFFAFA", "#FFF0F5", "#FAF0E6", "#F0FFF0"],
      "creatorID": users[13]._id
    },
    {
      "name": "Dark Grays",
      "colors": ["#696969", "#A9A9A9", "#808080", "#2F4F4F"],
      "creatorID": users[13]._id
    },
    {
      "name": "Neon Lights",
      "colors": ["#FF00FF", "#FFFF00", "#00FFFF", "#FF0000"],
      "creatorID": users[14]._id
    },
    {
      "name": "Retro Vibes",
      "colors": ["#FF69B4", "#FFC0CB", "#FFFAFA", "#FFB6C1"],
      "creatorID": users[14]._id
    },
    {
      "name": "Earthy Tones",
      "colors": ["#556B2F", "#A0522D", "#8B4513", "#D2691E"],
      "creatorID": users[15]._id
    },
    {
      "name": "Ocean Depths",
      "colors": ["#191970", "#000080", "#4682B4", "#0000CD"],
      "creatorID": users[15]._id
    }
  ];

  await Palette.insertMany(palettes);

  // Posts (add sample post data if needed)
  // ...
}

module.exports = connectDB; 
