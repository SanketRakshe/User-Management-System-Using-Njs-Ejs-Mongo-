const express = require('express');
const User = require('../models/user');

const router = express.Router();

// Create a mew User
router.post('/users', async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).send(user);
    } catch(err) {
        res.status(400).send(err);
    }
});

// Get all Users
router.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.send(users);
    } catch(err) {
        res.status(400).send(err);
    }
});

// Get a single user by ID
router.get('/users/:id', async(req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if(!user) {
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
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});
        if(!user) {
            res.status(404).send()
        }
        res.send(user);
    } catch(err) {
        res.status(400).send(err);
    }
})

// Delete a user by ID
router.delete('/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if(!user) {
            res.status(404).send();
        }
        res.send(user);
    } catch (err) {
        res.status(500).send(err);
    }
})

module.exports = router;



