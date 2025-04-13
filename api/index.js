import express from 'express';
import cors from 'cors';
import Projects from './services/Projects.js';
import config from './config.js';
import '@dotenvx/dotenvx/config';

const app = express();

app.use(express.json());
app.use(cors());

app.post('/set-path', async (req, res) => {
    const { path } = req.body;
    await Projects.setPath(path);
    res.status(200).json({ message: 'Path set successfully!' });
});

app.get('/projects', async (req, res) => {
    try {
        const projects = await Projects.find();
        res.status(200).send({ projects });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});

app.use((err, req, res, next) => {
    if (err) {
        return res.status(500).send({ error: err.message });
    }
    return res.status(500).send('Something broke!');
});

app.listen(config.DEV_PORT, () => {
    console.log(`Server is running on port ${config.DEV_PORT}`);
});
