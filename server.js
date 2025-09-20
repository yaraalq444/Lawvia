// server.js
require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const OPENAI_KEY = process.env.OPENAI_KEY;

app.post('/translate', async (req, res) => {
  const { text, mode } = req.body;
  if (!text || !mode) return res.status(400).json({ error: 'Missing text or mode' });

  const prompt =
    mode === 'toLegalese'
      ? `Translate the following into formal legal language (legalese), keep meaning exact:\n\n${text}`
      : `Translate the following legal text into plain English, keep meaning exact:\n\n${text}`;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${OPENAI_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [{ role: 'system', content: 'You are a legal translation assistant.' }, { role: 'user', content: prompt }],
        temperature: 0.2,
        max_tokens: 1200
      })
    });

    const data = await response.json();
    const translation = data.choices?.[0]?.message?.content || 'Error: no response';
    res.json({ translation });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
