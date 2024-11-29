import { Router } from "express";
import { User } from "../models/User.js";
import jwt from 'jsonwebtoken';
import { env } from "../environments.js";


const authController = Router();

const verifyToken = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return next();
    }
    jwt.verify(token, env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        req.userId = decoded.userId;
        next();
    });
};

authController.post('/register', async (req, res) => {
    const { avatar, username, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const user = new User({ avatar, username, email, password });
        await user.save();

        const token = jwt.sign({ userId: user._id }, env.JWT_SECRET, { expiresIn: env.JWT_EXPIRES_IN });
        res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'none', maxAge: 3600000 });

        res.status(201).json({ _id: user._id, avatar: user.avatar, username: user.username, email: user.email });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error });
    }
});

authController.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Wrong email or password' });
        }

        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Wrong email or password' });
        }

        const token = jwt.sign({ userId: user._id }, env.JWT_SECRET, { expiresIn: env.JWT_EXPIRES_IN });
        res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'none', maxAge: 3600000 });

        res.status(200).json({ _id: user._id, avatar: user.avatar, username: user.username, email: user.email });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error });
    }
});

authController.post('/logout', (req, res) => {
    res.clearCookie('token', { httpOnly: true, secure: true, sameSite: 'none' });
    res.status(200).json({ message: 'Logged out successfully' });
});

authController.get('/me', verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ _id: user._id, avatar: user.avatar, username: user.username, email: user.email });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user data', error });
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