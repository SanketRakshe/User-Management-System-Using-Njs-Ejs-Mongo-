const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const PORT = 3000;


// Middleware to parse JSON data from requests
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://rakshesanket67:Sanket%40123@cluster0.onhpp.mongodb.net/')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log('Failed to connect to MongoDB', err));


app.listen(PORT, () => {
    console.log(`Your app is up on http://localhost:${PORT}`);
})