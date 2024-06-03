# Define the base URL of your API
$baseUrl = "http://localhost:3000"

# Function to send a GET request
function Send-GetRequest($endpoint) {
  Write-Host "Sending GET request to: $baseUrl$endpoint"
  Invoke-WebRequest -Uri "$baseUrl$endpoint" -Method GET -ContentType "application/json"
}

# Function to send a POST request
function Send-PostRequest($endpoint, $body) {
  Write-Host "Sending POST request to: $baseUrl$endpoint"
  Invoke-WebRequest -Uri "$baseUrl$endpoint" -Method POST -ContentType "application/json" -Body ($body | ConvertTo-Json)
}

# Function to send a PUT request
function Send-PutRequest($endpoint, $body) {
  Write-Host "Sending PUT request to: $baseUrl$endpoint"
  Invoke-WebRequest -Uri "$baseUrl$endpoint" -Method PUT -ContentType "application/json" -Body ($body | ConvertTo-Json)
}

# Function to send a DELETE request
function Send-DeleteRequest($endpoint) {
  Write-Host "Sending DELETE request to: $baseUrl$endpoint"
  Invoke-WebRequest -Uri "$baseUrl$endpoint" -Method DELETE -ContentType "application/json"
}

Write-Host "=============================="
Write-Host "===== STARTING API TESTS ====="
Write-Host "=============================="

# ==============================
# ======= USER TESTING =========
# ==============================
# Example: Get all users
Write-Host "----- Testing GET /users -----"
$response = Send-GetRequest("/users")
Write-Host "Response Status Code: $($response.StatusCode)"
Write-Host "Response Content:"
Write-Host ($response.Content | ConvertFrom-Json | Select-Object -ExpandProperty name)
Write-Host "----------------------------------------------"

# Example: Get a specific user by ID
Write-Host "----- Testing GET /users/:id -----"
$userId = "655c763b44387716272e8c86"  # Replace with an actual user ID from your database
$response = Send-GetRequest("/users/$userId")
Write-Host "Response Status Code: $($response.StatusCode)"
Write-Host "Response Content:"
Write-Host ($response.Content | ConvertFrom-Json | Select-Object -ExpandProperty name)
Write-Host "----------------------------------------------"

# Example: Create a new user
Write-Host "----- Testing POST /users -----"
$newUser = @{
  name = "Test User"
  username = "testuser123"
  email =  "testuser@example.com" 
}
$response = Send-PostRequest("/users", $newUser)
Write-Host "Response Status Code: $($response.StatusCode)"
Write-Host "Response Content:"
Write-Host $response.Content
Write-Host "----------------------------------------------"

# Example: Delete a user by ID
Write-Host "----- Testing DELETE /users?username=[username] -----"
$username = "testuser123" # Replace with a valid username
$response = Send-DeleteRequest("/users?username=$username")
Write-Host "Response Status Code: $($response.StatusCode)"
Write-Host "Response Content:"
Write-Host $response.Content
Write-Host "----------------------------------------------"

# ==============================
# ======= POSTS TESTING ========
# ==============================
# Example: Get all posts
Write-Host "----- Testing GET /posts -----"
$response = Send-GetRequest("/posts")
Write-Host "Response Status Code: $($response.StatusCode)"
Write-Host "Response Content:"
Write-Host ($response.Content | ConvertFrom-Json | Select-Object -ExpandProperty title) 
Write-Host "----------------------------------------------"

# Example: Create a new post
Write-Host "----- Testing POST /posts -----"
$newPost = @{
  userId = "655c763b44387716272e8c86" # Replace with the actual user ID
  title = "My New Post from PowerShell"
  content = "This is the content of my new post from PowerShell."
  paletteId = "655c769344387716272e8c88"  # Replace with the actual palette ID
}
$response = Send-PostRequest("/posts", $newPost)
Write-Host "Response Status Code: $($response.StatusCode)"
Write-Host "Response Content:"
Write-Host $response.Content
Write-Host "----------------------------------------------"

# Example: Delete a post by ID
Write-Host "----- Testing DELETE /posts/:id -----"
$postId = "your_post_id_here"  # Replace with a valid post ID
$response = Send-DeleteRequest("/posts/$postId")
Write-Host "Response Status Code: $($response.StatusCode)"
Write-Host "Response Content:"
Write-Host $response.Content
Write-Host "----------------------------------------------"

# Example: Get a specific post by ID
Write-Host "----- Testing GET /posts/:id -----"
$postId = "your_post_id_here"  # Replace with a valid post ID
$response = Send-GetRequest("/posts/$postId")
Write-Host "Response Status Code: $($response.StatusCode)"
Write-Host "Response Content:"
Write-Host $response.Content
Write-Host "----------------------------------------------"

# Example: Update a post by ID
Write-Host "----- Testing PATCH /posts/:id -----"
$postId = "your_post_id_here"  # Replace with a valid post ID
$updatedPost = @{
  title = "Updated Post Title"
}
$response = Send-PutRequest("/posts/$postId", $updatedPost)
Write-Host "Response Status Code: $($response.StatusCode)"
Write-Host "Response Content:"
Write-Host $response.Content
Write-Host "----------------------------------------------"

# ==============================
# ====== PALETTES TESTING ======
# ==============================
# Example: Get all palettes
Write-Host "----- Testing GET /palettes -----"
$response = Send-GetRequest("/palettes")
Write-Host "Response Status Code: $($response.StatusCode)"
Write-Host "Response Content:"
Write-Host ($response.Content | ConvertFrom-Json | Select-Object -ExpandProperty name)
Write-Host "----------------------------------------------"

# Example: Create a new palette
Write-Host "----- Testing POST /palettes -----"
$newPalette = @{
  name = "My Test Palette"
  colors = @("#FF0000", "#00FF00", "#0000FF")
  creatorID = "your_user_id_here"  # Replace with a valid user ID
}
$response = Send-PostRequest("/palettes", $newPalette)
Write-Host "Response Status Code: $($response.StatusCode)"
Write-Host "Response Content:"
Write-Host $response.Content
Write-Host "----------------------------------------------"

# Example: Delete a palette by ID
Write-Host "----- Testing DELETE /palettes/:id -----"
$paletteId = "your_palette_id_here"  # Replace with a valid palette ID
$response = Send-DeleteRequest("/palettes/$paletteId")
Write-Host "Response Status Code: $($response.StatusCode)"
Write-Host "Response Content:"
Write-Host $response.Content
Write-Host "----------------------------------------------"

# Example: Get a specific palette by ID
Write-Host "----- Testing GET /palettes/:id -----"
$paletteId = "your_palette_id_here"  # Replace with a valid palette ID
$response = Send-GetRequest("/palettes/$paletteId")
Write-Host "Response Status Code: $($response.StatusCode)"
Write-Host "Response Content:"
Write-Host $response.Content
Write-Host "----------------------------------------------"

# Example: Update a palette by ID
Write-Host "----- Testing PATCH /palettes/:id -----"
$paletteId = "your_palette_id_here"  # Replace with a valid palette ID
$updatedPalette = @{
  name = "My Updated Palette"
}
$response = Send-PutRequest("/palettes/$paletteId", $updatedPalette)
Write-Host "Response Status Code: $($response.StatusCode)"
Write-Host "Response Content:"
Write-Host $response.Content
Write-Host "=============================="
Write-Host "======= FINISHED TESTS ========"
Write-Host "=============================="
