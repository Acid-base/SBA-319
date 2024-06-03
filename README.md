
## API Documentation

### Users

* **GET /users** - Retrieves a list of all users.
    * **Request:** None.
    * **Response:** Array of user objects (e.g., `[{ name: 'John Doe', email: 'john.doe@example.com' }]`)
* **POST /users** - Creates a new user.
    * **Request:** `{ name: 'New User', email: 'new.user@example.com' }`
    * **Response:** `{ id: '...', name: 'New User', email: 'new.user@example.com' }`

### Posts

* **GET /posts** - Retrieves a list of all posts.
    * **Request:** None.
    * **Response:** Array of post objects (e.g., `[{ title: 'My Blog Post', content: '...', userId: '...' }]`)
* **POST /posts** - Creates a new post.
    * **Request:** `{ title: 'My New Post', content: '...', userId: '...' }` 
    * **Response:** `{ id: '...', title: 'My New Post', content: '...', userId: '...' }`
