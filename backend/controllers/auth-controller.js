import { Router } from "express";
import { User } from "../models/User.js";

const authController = Router();

authController.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        await User.create({ username, email, password });
        res.status(201).json({ message: 'User registered successfully!' });
    } catch (error) {
        res.status(400).json({ message: 'Registration failed!', error });
    }
});

export default authController;