import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors'; // <-- Add this
import authRoutes from './routes/authRoutes.js';
import summarizeText from '../backend/server/summarizer.js'; 
import bodyParser from 'body-parser';

dotenv.config();

const app = express();
app.use(bodyParser.json());

// Middleware
app.use(cors()); // <-- Enable CORS for all origins
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// Routes
app.use('/api/auth', authRoutes);

app.post('/summarize', (req, res) => {
  const { text } = req.body;  // Get the 'text' from the request

  if (!text) {
      // If no text is given, tell the user
      return res.status(400).json({ error: 'No text provided' });
  }

  const summary = summarizeText(text);  // Call the summarizer
  res.json({ summary });                // Send back the summary
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
