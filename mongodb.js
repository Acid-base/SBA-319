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
      "colors": ["#00BFFF", "#ADD8E6", "#6495ED", "#1E90FF"],
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
      "colors": ["#F0F8FF", "#FAEBD7", "#FFF5EE", "#F5F5F5"], // The suggested change was applied here
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
    }
  ];

  await Palette.insertMany(palettes);

  // Posts
  const posts = [
    {
      "title": "Sunset Hues are my favorite!",
      "content": "I love the warm and inviting feel of these colors. They remind me of summer evenings.",
      "paletteId": palettes[0]._id, // Referencing the first palette in the array
      "userId": users[0]._id 
    },
    {
      "title": "Ocean Breeze is so calming",
      "content": "These blues and greens are perfect for creating a peaceful and relaxing atmosphere.",
      "paletteId": palettes[0]._id, 
      "userId": users[1]._id
    },
    {
      "title": "Forest Greens are earthy and grounding",
      "content": "I find these colors to be very grounding and connected to nature.",
      "paletteId": palettes[1]._id,
      "userId": users[0]._id 
    },
    {
      "title": "Midnight Blues are elegant and sophisticated",
      "content": "These deep blues are perfect for creating a luxurious and stylish feel.",
      "paletteId": palettes[1]._id, 
      "userId": users[1]._id
    },
    {
      "title": "Citrus Burst is full of energy!",
      "content": "These bright and vibrant colors are perfect for adding a pop of energy to any design.",
      "paletteId": palettes[2]._id, 
      "userId": users[2]._id
    },
    {
      "title": "Warm Earths make me feel cozy",
      "content": "These warm browns and yellows are perfect for creating a welcoming and cozy atmosphere.",
      "paletteId": palettes[2]._id,
      "userId": users[3]._id 
    },
    {
      "title": "Cool Grays are timeless and versatile",
      "content": "These neutral grays can be used in a wide variety of designs.",
      "paletteId": palettes[3]._id, 
      "userId": users[2]._id
    },
    {
      "title": "Vibrant Purples are regal and sophisticated",
      "content": "These rich purples are perfect for adding a touch of elegance and luxury to any design.",
      "paletteId": palettes[3]._id,
      "userId": users[3]._id 
    },
    {
      "title": "Spring Blossoms are cheerful and bright",
      "content": "These pastel pinks and purples are perfect for creating a cheerful and feminine feel.",
      "paletteId": palettes[4]._id,
      "userId": users[4]._id 
    },
    {
      "title": "Desert Sands are warm and inviting",
      "content": "These sandy browns and yellows are perfect for creating a warm and inviting atmosphere.",
      "paletteId": palettes[4]._id,
      "userId": users[5]._id 
    },
    {
      "title": "Tropical Paradise is vibrant and energetic",
      "content": "These bright blues and greens are perfect for creating a tropical and energetic feel.",
      "paletteId": palettes[5]._id,
      "userId": users[4]._id 
    },
    {
      "title": "Vintage Reds are classic and elegant",
      "content": "These rich reds are perfect for creating a classic and elegant feel.",
      "paletteId": palettes[5]._id, 
      "userId": users[5]._id
    },
    {
      "title": "Pastel Dreams are soft and dreamy",
      "content": "These soft pastels are perfect for creating a dreamy and romantic feel.",
      "paletteId": palettes[6]._id,
      "userId": users[6]._id 
    },
    {
      "title": "Deep Shadows are mysterious and moody",
      "content": "These dark and moody colors are perfect for creating a mysterious and dramatic feel.",
      "paletteId": palettes[6]._id, 
      "userId": users[7]._id
    },
    {
      "title": "Autumn Blaze is warm and inviting",
      "content": "These warm oranges and reds are perfect for creating a warm and inviting atmosphere.",
      "paletteId": palettes[7]._id,
      "userId": users[6]._id 
    },
    {
      "title": "Electric Vibes are bold and energetic",
      "content": "These bright and bold colors are perfect for creating a vibrant and energetic feel.",
      "paletteId": palettes[7]._id,
      "userId": users[7]._id 
    },
    {
      "title": "Candy Colors are sweet and playful",
      "content": "These bright and playful colors are perfect for creating a fun and whimsical feel.",
      "paletteId": palettes[8]._id, 
      "userId": users[8]._id
    },
    {
      "title": "Modern Neutrals are chic and sophisticated",
      "content": "These neutral colors are perfect for creating a modern and sophisticated feel.",
      "paletteId": palettes[8]._id, 
      "userId": users[9]._id
    },
    {
      "title": "Bold Contrasts are eye-catching and impactful",
      "content": "These contrasting colors are perfect for creating a bold and impactful design.",
      "paletteId": palettes[9]._id, 
      "userId": users[8]._id
    },
    {
      "title": "Sky and Clouds are serene and peaceful",
      "content": "These soft blues and whites are perfect for creating a serene and peaceful atmosphere.",
      "paletteId": palettes[9]._id, 
      "userId": users[9]._id
    }
  ];

  await Post.insertMany(posts);
  console.log('Database seeded successfully!');
}

module.exports = connectDB;
