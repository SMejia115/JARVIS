import express from 'express';
import {OpenAI} from 'openai';
import { Router } from 'express';

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


const chatHandler = async (req, res) => {
    const { message } = req.body;
    const response = await openai.chat.completions.create({
        engine: 'davinci',
        prompt: message,
        maxTokens: 100,
        temperature: 0.9,
        topP: 1,
        presencePenalty: 0,
        frequencyPenalty: 0,
        bestOf: 1,
        n: 1,
        stream: false,
        stop: ['\n', "Human:", "AI:"]
    });
    res.json({ message: response.data.choices[0].text.trim() });
}

console.log(response.data);

const router = Router();
router.post('/chat', chatHandler);
router.get('/', (req, res) => {
    res.send('Sever is running on port 3000');
});

app.use(express.json());



const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});


