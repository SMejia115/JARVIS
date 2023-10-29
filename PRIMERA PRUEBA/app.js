import express from 'express';
import {OpenAI} from 'openai';

const app = express();
const openai = new OpenAI({
  apiKey: "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"
});

app.get('/', (req, res) => {
    res.send('Sever is running on port 30000000');
});


const response = await openai.chat.completions.create({
  model: "gpt-3.5-turbo",
  messages: [
    { role: "system", content: "Tú eres un asistente virtual que ayuda a hacer reservas de hotel." },
    { role: "user", content: "Quiero reservar una habitación de hotel en Nueva York." }
  ],
  temperature: 0,
  max_tokens: 1024,

});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});


