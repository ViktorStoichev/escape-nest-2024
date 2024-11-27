import { Router } from "express";
import { User } from "../models/User.js";

const authController = Router();

authController.post('/register', async (req, res) => {
    try {
        const { avatar, username, email, password } = req.body;
        await User.create({ avatar, username, email, password });
        res.status(201).json({ message: 'User registered successfully!' });
    } catch (error) {
        res.status(400).json({ message: 'Registration failed!', error });
    }
});

authController.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email, password });
        if (!user) return res.status(404).json({ error: 'Invalid email or password!' });

        res.json({ _id: user._id, avatar: user.avatar, username: user.username, email: user.email, createdAt: user.createdAt, updatedAt: user.updatedAt });
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