const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { secret } = require('../config/jwt');
const User = require('../models/User');

async function login(req, res) {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).json({ message: 'Invalid password' });

    const token = jwt.sign({ _id: user._id, username: user.username }, secret);
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: `Internal server error: ${error}` });
  }
}

module.exports = { login };