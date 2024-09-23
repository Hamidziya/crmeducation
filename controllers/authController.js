const User = require('../models/user');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ where: { username } });
    if (!user || !(await user.validatePassword(password))) {
      return res.status(401).json({ message: 'Wrong Password' });
    }

    const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '24h' });
    res.json({id: user.id, username: user.username , token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.register = async (req, res) => {
    const { username, password, email } = req.body;
  
    try {
      let user = await User.findOne({ where: { username } });
  
      if (user) {
        // If user exists, validate password
        if (!(await user.validatePassword(password))) {
          return res.status(401).json({ message: 'Wrong Password' });
        }
      } else {
        // If user does not exist, create a new user
        user = await User.create({ username, password, email });
      }
  
      // Generate a JWT token
      const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '24h' });
      res.json({id: user.id, username: user.username , token });
  
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };