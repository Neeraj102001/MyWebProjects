const express = require('express');
const User = require('../models/User');
const router = express.Router();

// User Registration
router.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const user = new User({ name, email, password });
        await user.save();
        res.status(201).json({ message: 'User  registered successfully!' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// User Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user || !(await user.matchPassword(password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        res.status(200).json({ message: 'Login successful!' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
