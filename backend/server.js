import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors'

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb+srv://viktorstoichev534:viktorstoichev534@google-cloud-database.88cfv.mongodb.net/escape-nest?authMechanism=SCRAM-SHA-1');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => console.log('Connected to MongoDB'));

app.get('/', (req, res) => {
    res.send('Server has started!')
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Backend running at http://localhost:${PORT}`));