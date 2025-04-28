import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import summarizeText from '../summarizer.js'; // don’t forget the .js at the end


const app = express();  // Make a new app
const PORT = 5000;      // Our server will run on port 5000

// Let our app use CORS and JSON
app.use(cors());
app.use(bodyParser.json());

// This is the route that listens to POST requests at /summarize
app.post('/summarize', (req, res) => {
    const { text } = req.body;  // Get the 'text' from the request

    if (!text) {
        // If no text is given, tell the user
        return res.status(400).json({ error: 'No text provided' });
    }

    const summary = summarizeText(text);  // Call the summarizer
    res.json({ summary });                // Send back the summary
});

// Start the server and listen for requests
app.listen(PORT, () => {
    console.log(`✅ Server is running on http://localhost:${PORT}`);
});
