# My MongoDB CRUD API

Basic application using Express and MongoDB. It provides CRUD operations for managing stored color palettes, user entries, and allows users to post their thoughts on different palettes.

## Data Models

- **User:** 
  - `name` (string)
  - `username` (string, unique)
  - `email` (string, unique, validated)
- **Post:** 
  - `title` (string)
  - `content` (string)
  - `paletteId` (ObjectId, references Palette)
  - `userId` (ObjectId, references User)
- **Palette:** 
  - `name` (string)
  - `colors` (array of strings, validated for hex color codes)
  - `creatorID` (ObjectId, references User)

## API Endpoints

### Users
- **GET /users:** Get all users.
- **GET /users/:id:** Get a user by ID.
- **POST /users:** Create a new user.
- **DELETE /users?username=[username]:** Delete a user by username. 

### Posts 
- **GET /posts:** Get all posts.
- **GET /posts/:id:** Get a post by ID.
- **POST /posts:** Create a new post.
- **PATCH /posts/:id:** Update a post by ID.
- **DELETE /posts/:id:** Delete a post by ID. 

### Palettes
- **GET /palettes:** Get all palettes.
- **GET /palettes/:id:** Get a palette by ID.
- **POST /palettes:** Create a new palette.
- **PATCH /palettes/:id:** Update a palette by ID.
- **DELETE /palettes/:id:** Delete a palette by ID.

## Technologies Used
- Node
- Express
- MongoDB
- Mongoose 

## Installation and Running
git clone
npm i
node index.js
