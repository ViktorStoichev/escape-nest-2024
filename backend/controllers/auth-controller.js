import { Router } from "express";
import { User } from "../models/User.js";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const authController = Router();

authController.post('/register', async (req, res) => {
    try {
        const { avatar, username, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: 'User already exists' });

        await User.create({ avatar, username, email, password });
        res.status(201).json({ message: 'User registered successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

authController.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Invalid credentials' });
    
        const isMatch = await user.comparePassword(password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
    
        const token = jwt.sign(
            { id: user._id, avatar: user.avatar, username: user.username, email: user.email, createdAt: user.createdAt, updatedAt: user.updatedAt },
             process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({token, message: 'Login successful' });
    } catch (error) {
        res.status(500).json({ error: 'Login failed!' });
    }
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