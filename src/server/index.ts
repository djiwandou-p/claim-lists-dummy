import express from 'express';
import { saveFeedback } from './api';

const app = express();
const port = 3001;

app.use(express.json());

app.post('/api/save-feedback', async (req, res) => {
  try {
    await saveFeedback(req.body);
    res.json({ success: true });
  } catch (error) {
    console.error('Error saving feedback:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});