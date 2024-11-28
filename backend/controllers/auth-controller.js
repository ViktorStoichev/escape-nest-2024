import { Router } from "express";
import { User } from "../models/User.js";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const authController = Router();

authController.post('/register', async (req, res) => {
    const { avatar, username, email, password } = req.body;

    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }
  
      const user = new User({ avatar, username, email, password });
      await user.save();
  
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
      res.cookie('auth-user', token, { httpOnly: true, secure: true });
  
      res.status(201).json({ user: { _id: user._id, avatar: user.avatar, username: user.username, email: user.email } });
    } catch (error) {
      res.status(500).json({ message: 'Error registering user', error });
    }
});

authController.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      const isPasswordValid = await user.isPasswordValid(password);
      if (!isPasswordValid) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
      res.cookie('auth-user', token, { httpOnly: true, secure: true });
  
      res.status(200).json({ user: { _id: user._id, avatar: user.avatar, username: user.username, email: user.email } });
    } catch (error) {
      res.status(500).json({ message: 'Error logging in', error });
    }
});

authController.post('/logout', (req, res) => {
    res.clearCookie('auth-user');
    res.status(200).json({ message: 'Logged out successfully' });
});

authController.get('/visit-profile/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await User.findById(userId);
        res.status(201).json(user);
    } catch (error) {
        console.log(error);
    }
});

export default authController;