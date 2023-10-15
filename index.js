const OpenAI = require('openai');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

const openai = new OpenAI({
  apiKey: "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"
});

// Use bodyParser middleware to parse JSON data in request bodies
app.use(bodyParser.json());

// Enable CORS for all routes
app.use(cors());

// Physio API Endpoint
app.post('/', async (req, res) => {
  const basePrompt = "ChatGPT, acting as a virtual physical therapist, please provide general insights regarding potential causes and general management strategies for the pain description provided by the user. Identify the area of the body the pain is coming from, and identify the degree of pain the user is facing. (ex. sharp, dull, constant, intermittent). Identify additional information that may be relevant to the prognosis such as such as activities that exacerbate the pain, duration of pain, any previous injuries. If the user does not provide an area of the body the pain is coming from, degree of pain the user is facing, pain intensity and frequency, lifestyle/physical activity choices, or any other pertinent information needed to provide remedy options ask the user nicely for the information. The user can choose to not provide specific information, but if they do so warn them that the suggestions provided may not be as accurate. Based on the information collected, provide relevant exercises/stretches they can do to alleviate their pain, the frequency that they should be doing the exercise, and viable remedy options."
  const finalPrompt = basePrompt + req.body.message;
  console.log("final prompt:", `${finalPrompt}`);

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{"role": "user", "content": finalPrompt}],
      max_tokens: 500
    });
    console.log(response.choices[0].message.content);
    if(response.choices[0].message.content) {
      res.json({message: response.choices[0].message.content});
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred.' });
  }
});

// Start the Express server
const port = 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
