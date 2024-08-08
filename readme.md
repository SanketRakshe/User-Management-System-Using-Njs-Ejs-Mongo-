
```markdown
# User Management System

A simple User Management System built with Node.js, Express, MongoDB, and Mongoose. This application allows you to perform basic CRUD (Create, Read, Update, Delete) operations on users.

## Features

- **Create User:** Add a new user to the database.
- **Read Users:** Retrieve a list of all users or get a user by ID.
- **Update User:** Modify an existing user's information.
- **Delete User:** Remove a user from the database.

## Technologies Used

- **Node.js:** JavaScript runtime for building the server-side application.
- **Express:** Fast, unopinionated, minimalist web framework for Node.js.
- **MongoDB:** NoSQL database for storing user data.
- **Mongoose:** ODM (Object Data Modeling) library for MongoDB and Node.js.

## Installation

### Prerequisites

- Node.js installed on your machine.
- MongoDB installed locally or a connection string to a MongoDB database.

### Steps

1. **Create a new project folder:**

   ```bash
   mkdir user-management-system
   cd user-management-system
   ```

2. **Initialize a new Node.js project:**

   ```bash
   npm init -y
   ```

3. **Install the necessary dependencies:**

   ```bash
   npm install express mongoose body-parser
   ```

4. **Create the `index.js` file:**

   ```bash
   touch index.js
   ```

5. **Set up Express and Mongoose in `index.js`:**

   ```javascript
   const express = require('express');
   const mongoose = require('mongoose');
   const bodyParser = require('body-parser');

   const app = express();

   // Middleware to parse JSON data from requests
   app.use(bodyParser.json());

   // Connect to MongoDB (replace '<your_mongo_connection_string>' with your actual MongoDB connection string)
   mongoose.connect('<your_mongo_connection_string>', { useNewUrlParser: true, useUnifiedTopology: true })
       .then(() => console.log('Connected to MongoDB'))
       .catch(err => console.log('Failed to connect to MongoDB', err));

   // Start the server
   const PORT = 3000;
   app.listen(PORT, () => {
       console.log(`Server is running on http://localhost:${PORT}`);
   });
   ```

6. **Create a `models` folder and inside it, a `User.js` file:**

   ```bash
   mkdir models
   touch models/User.js
   ```

7. **Define the User schema in `models/User.js`:**

   ```javascript
   const mongoose = require('mongoose');

   const userSchema = new mongoose.Schema({
       name: {
           type: String,
           required: true
       },
       email: {
           type: String,
           required: true,
           unique: true
       },
       age: {
           type: Number,
           required: true
       }
   });

   const User = mongoose.model('User', userSchema);

   module.exports = User;
   ```

8. **Create a `routes` folder and inside it, a `user.js` file:**

   ```bash
   mkdir routes
   touch routes/user.js
   ```

9. **Define routes for the CRUD operations in `routes/user.js`:**

   ```javascript
   const express = require('express');
   const User = require('../models/User');

   const router = express.Router();

   // Create a new user
   router.post('/users', async (req, res) => {
       try {
           const user = new User(req.body);
           await user.save();
           res.status(201).send(user);
       } catch (err) {
           res.status(400).send(err);
       }
   });

   // Get all users
   router.get('/users', async (req, res) => {
       try {
           const users = await User.find();
           res.send(users);
       } catch (err) {
           res.status(500).send(err);
       }
   });

   // Get a user by ID
   router.get('/users/:id', async (req, res) => {
       try {
           const user = await User.findById(req.params.id);
           if (!user) {
               return res.status(404).send();
           }
           res.send(user);
       } catch (err) {
           res.status(500).send(err);
       }
   });

   // Update a user by ID
   router.patch('/users/:id', async (req, res) => {
       try {
           const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
           if (!user) {
               return res.status(404).send();
           }
           res.send(user);
       } catch (err) {
           res.status(400).send(err);
       }
   });

   // Delete a user by ID
   router.delete('/users/:id', async (req, res) => {
       try {
           const user = await User.findByIdAndDelete(req.params.id);
           if (!user) {
               return res.status(404).send();
           }
           res.send(user);
       } catch (err) {
           res.status(500).send(err);
       }
   });

   module.exports = router;
   ```

10. **Update `index.js` to use the `user.js` routes:**

    ```javascript
    const express = require('express');
    const mongoose = require('mongoose');
    const bodyParser = require('body-parser');
    const userRoutes = require('./routes/user');

    const app = express();

    // Middleware to parse JSON data from requests
    app.use(bodyParser.json());

    // Connect to MongoDB
    mongoose.connect('<your_mongo_connection_string>', { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log('Connected to MongoDB'))
        .catch(err => console.log('Failed to connect to MongoDB', err));

    // Use the user routes
    app.use('/api', userRoutes);

    // Start the server
    const PORT = 3000;
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
    ```

11. **Start the server:**

    ```bash
    node index.js
    ```

12. **Test the API using a tool like [Postman](https://www.postman.com/) or [cURL](https://curl.se/):**

    - **Create a User (POST request):**
      ```
      POST /api/users
      Body: {
          "name": "John Doe",
          "email": "johndoe@example.com",
          "age": 30
      }
      ```

    - **Get All Users (GET request):**
      ```
      GET /api/users
      ```

    - **Get a User by ID (GET request):**
      ```
      GET /api/users/<user_id>
      ```

    - **Update a User by ID (PATCH request):**
      ```
      PATCH /api/users/<user_id>
      Body: {
          "age": 31
      }
      ```

    - **Delete a User by ID (DELETE request):**
      ```
      DELETE /api/users/<user_id>
      ```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
```
