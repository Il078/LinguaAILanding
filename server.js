// server.js
const express = require('express');
const cors = require('cors');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args)); // Fix for ESM

const app = express();
app.use(cors());
app.use(express.json());

const API_KEY = 'AIzaSyAt-4Ohija4uGE38MiFEuBBsrkFKTIxJg8'; // ⛔ Replace this with your actual key

app.post('/translate', async (req, res) => {
    const { q, target } = req.body;

    if (!q || !target) {
        return res.status(400).json({ error: 'Missing text or target language.' });
    }

    console.log('📨 Request received:', { q, target });

    try {
        const response = await fetch(`https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                q,
                target,
                format: 'text'
            })
        });

        const data = await response.json();

        if (!response.ok || !data?.data?.translations?.length) {
            console.error('❌ Google Translate API error:', data);
            return res.status(500).json({ error: data.error?.message || 'Translation failed.' });
        }

        console.log('✅ Translated:', data.data.translations[0].translatedText);
        res.json(data);
    } catch (err) {
        console.error('❌ Proxy Error:', err.message);
        res.status(500).json({ error: 'Translation failed.' });
    }
});

app.listen(3001, () => {
    console.log('🚀 Translation Proxy running at http://localhost:3001');
});
