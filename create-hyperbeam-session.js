import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import fetch from 'node-fetch';

dotenv.config();

const app = express();

app.use(cors({
  origin: '*'
}));

app.use(express.json());

app.post('/create-hyperbeam-session', async (req, res) => {
  const hyperbeamApiKey = process.env.HYPERBEAM_API_KEY;

  if (!hyperbeamApiKey) {
    return res.status(500).json({ error: 'Hyperbeam API Key not configured.' });
  }

  try {
    const hyperbeamResponse = await fetch('https://api.hyperbeam.com/v0/vm', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${hyperbeamApiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        start_url: 'https://google.com',
        expires_in: 3600
      })
    });

    const hyperbeamData = await hyperbeamResponse.json();

    if (!hyperbeamResponse.ok) {
      console.error('Hyperbeam API Error:', hyperbeamData);
      return res.status(hyperbeamResponse.status).json({
        error: hyperbeamData.message || 'Failed to create Hyperbeam session.'
      });
    }

    res.status(200).json({ embed_url: hyperbeamData.embed_url });

  } catch (error) {
    console.error('Backend error when creating Hyperbeam session:', error);
    res.status(500).json({ error: 'Internal server error while creating Hyperbeam session.' });
  }
});

export default app;
