import express, { text } from 'express';
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import fs from "fs";
import path from "path";
// openai configuration

import { OpenAI } from "openai";


const app = express();
const port = 5500;


// Middlewares
app.use(express.json());
app.use(cors());
dotenv.config();
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));


const openai = new OpenAI({
  apiKey: process.env.OPENAI_KEY
});


// Routes

app.get("/openai", (req,res) => {
  console.log(openai)
  res.send("Hello World");
})



app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});



// generate text 

const generateText = async (req, res) => {
  const prompt = req.body.prompt;
  const rol = req.body.rol;
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "system", content: rol },
    { role: "user", content: prompt }],
    temperature: 1,
    max_tokens: 1000,
  });
  
  res.json(response.choices[0].message.content);

}



const prueba = async (req, res) => {
  const prompt = req.body.prompt;
  const model = req.body.model;
  const max_tokens = req.body.max_tokens;
  const temperature = req.body.temperature;
  console.log(req.body);
  const response = await openai.chat.completions.create({
    model: model,
    messages: [{ role: "system", content: "Eres un asistente virtual llamado Jarvis que puede responder cualquier pregunta. Tu creador es Santiago Mejía, un estudiante de Ingeniería en Sistemas y Computación en la UTP. Eres colombiano." }, 
    { role: "user", content: prompt }],
    temperature: temperature,
    max_tokens: max_tokens,
  });
  
  res.json(response.choices[0].message.content); 
 
}

// text to speech

const speechFile = path.resolve("./speech.mp3");

const textToSpeech = async (req, res) => {
  const text = req.body.text;
  console.log(text);
  const voice = await openai.audio.speech.create({
    model: "tts-1",
    voice: "echo",
    input: text,
  });
  console.log(speechFile);
  const buffer = Buffer.from(await voice.arrayBuffer());
  await fs.promises.writeFile(speechFile, buffer);
  // res.sendFile(speechFile);
  res.setHeader('Content-Type', 'audio/mpeg');
  res.setHeader('Content-Disposition', 'attachment; filename="speech.mp3"');

  res.send(buffer); 
  
}


// image generation
 
const imageGeneration = async (req, res) => {
  const prompt = req.body.prompt;  
  const image = await openai.images.generate({ 
    model: "dall-e-3", 
    prompt: prompt});
  res.send(image.data.url);
  console.log(image.data); 
}

app.post("/openai", generateText);
app.post("/prueba", prueba);
app.post("/image", imageGeneration);
app.post("/speech", textToSpeech);

