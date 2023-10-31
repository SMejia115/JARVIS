import { Configuration, OpenAIApi } from "openai";


const readline = require('node:readline/promises').createInterface({
    input: process.stdin,
    output: process.stdout
  });

const configuration = new Configuration({
  apiKey: "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"
});
const openai = new OpenAIApi(configuration);

async function writeEmail(name, topic, destination) {
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `Write an email for ${destination}, ${topic}, my name is ${name}`,
        max_tokens: 200,
        temperature: 0.7,
    });

    console.log(response.data.choices[0].text)
}

(async () => {
    let destination = await readline.question('Who is the email for? (let us know if this person knows you) ')
    let name = await readline.question("What's your name? ")
    let topic = await readline.question('What is the email about? ')

    await writeEmail(name, topic, destination)
  
    readline.close();
})()