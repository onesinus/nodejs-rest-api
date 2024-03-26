// controllers/userController.js

const bcrypt = require('bcrypt');
const User = require('../models/User');

async function register(req, res) {
  const { username, password } = req.body;

  try {
    // Check if the username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password.toString(), saltRounds);

    // Create a new user
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'InternalServerError', message: `Internal server error. ${error}` });
  }
}

module.exports = { register };
