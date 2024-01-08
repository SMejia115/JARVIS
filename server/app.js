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


