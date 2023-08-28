const express = require("express")
require("dotenv").config()
const axios = require('axios');
const bodyParser = require('body-parser');
const cors=require("cors")

const app = express()
app.use(bodyParser.json());
app.use(cors())

app.get("/", (req, res) => {
    res.send("Home Page")
})

app.post('/convert-code', async (req, res) => {
    try {
        console.log(req.body)
        const { code, targetLanguage } = req.body;

        const response = await axios.post(
            'https://api.openai.com/v1/completions',
            {
                model: "text-davinci-003",
                prompt: `Translate the following code to ${targetLanguage}:\n${code}`,
                max_tokens: 150,
                temperature: 0.7,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
                },
            }
        );

        const convertedCode = response.data.choices[0].text.trim();
        res.json({ convertedCode });
    } catch (error) {
        console.error('Error converting code:', error.message);
        res.status(500).json({ error: 'Error converting code' });
    }
});


app.post('/debug-code', async (req, res) => {
    try {
        const { code } = req.body;

        const response = await axios.post(
            'https://api.openai.com/v1/completions',
            {
                model: "text-davinci-003",
                prompt: `Debug the following code:\n${code}\nAlso Provide short explanation if any issues or just reply with Code is Perfect. `,
                max_tokens: 150,
                temperature: 0.7,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
                },
            }
        );

        const convertedCode = response.data.choices[0].text.trim();
        res.json({ convertedCode });
    } catch (error) {
        console.error('Error converting code:', error.message);
        res.status(500).json({ error: 'Error converting code' });
    }
});


app.post('/check-code-quality', async (req, res) => {
    try {
        const { code } = req.body;

        const response = await axios.post(
            'https://api.openai.com/v1/completions',
            {
                model: "text-davinci-003",
                prompt: `Check the quality of the following code:\n${code}\nReply in short and simple.`,
                max_tokens: 150,
                temperature: 0.7,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
                },
            }
        );

        const convertedCode = response.data.choices[0].text.trim();
        res.json({ convertedCode });
    } catch (error) {
        console.error('Error converting code:', error.message);
        res.status(500).json({ error: 'Error converting code' });
    }
});



app.listen(process.env.PORT, () => {
    console.log("Server Running on PORT:", process.env.PORT)
})
