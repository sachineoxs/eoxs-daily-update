import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
const port = 8000;

app.use(cors());
app.use(bodyParser.json());

// Store updates in memory (replace with database in production)
const updates = [];

app.post('/api/daily-update', (req, res) => {
  try {
    const update = req.body;
    updates.push(update);
    res.status(201).json({ message: 'Update added successfully', update });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add update' });
  }
});

app.get('/api/daily-updates', (req, res) => {
  res.json(updates);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
}); 