import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors'
import authController from './controllers/auth-controller.js';
import postController from './controllers/post-controller.js';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

mongoose.connect(process.env.MONGO_URI);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => console.log('Connected to MongoDB'));

app.use('/api/auth', authController);
app.use('/api/posts', postController);

app.listen(process.env.PORT, () => console.log(`Backend running at http://localhost:${process.env.PORT}`));