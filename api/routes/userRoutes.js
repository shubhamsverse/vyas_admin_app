import express from 'express'
import User from '../models/User.js';

const router = express.Router();

const adminCode = 'admin123';

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (user && (await user.matchPassword(password))) {
      res.json({
        message: `Welcome ${username}`,
      });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/create', async (req, res) => {
  const { username, password } = req.body;

  try {
    const userExists = await User.findOne({ username });

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = new User({
      username,
      password,
    });

    await user.save();

    res.status(201).json({
      message: `User ${username} created successfully`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
