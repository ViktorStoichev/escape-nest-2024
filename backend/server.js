import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors'
import authController from './controllers/auth-controller.js';
import postController from './controllers/post-controller.js';
import cookieParser from 'cookie-parser';
import { env } from './environments.js';

const app = express();

app.use(cors({
    origin: 'http://localhost:4200',
    credentials: true,
  }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

mongoose.connect(env.MONGO_URI);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => console.log('Connected to MongoDB'));

app.get('/', (req, res) => {
    res.send('Server works!')
});

app.use('/api/auth', authController);
app.use('/api/posts', postController);

app.listen(env.PORT, () => console.log(`Backend running at http://localhost:${env.PORT}`));