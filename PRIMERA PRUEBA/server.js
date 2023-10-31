import express from 'express';
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";

const app = express();
const port = 5500;


// Middlewares
app.use(express.json());
app.use(cors());
dotenv.config();
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// openai configuration

import { OpenAI } from "openai";

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
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "system", content: "Eres un asistente virtual que puede responder cualquier pregunta" },
    { role: "user", content: prompt }],
    temperature: 1,
    max_tokens: 200,
  });
  
  res.json(response.choices[0].message.content);

}

app.post("/openai", generateText);
app.post("/prueba", prueba);