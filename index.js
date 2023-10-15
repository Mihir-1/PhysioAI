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

app.post('/', async (req, res) => {
  const basePrompt = `
  ChatGPT, acting as a virtual physical therapist, please provide general insights regarding
  potential causes and general management strategies for the problem description provided by the user.
  Identify the area of the body the pain is coming from, and identify the degree of pain the user is facing.
  (ex. sharp, dull, constant, intermittent). Identify additional information that may be relevant to
  the prognosis such as activities that exacerbate the pain, duration of pain, any previous injuries.
  If the user does not provide an area of the body the pain is coming from, when the pain started,
  degree of pain the user is facing, pain intensity and frequency, lifestyle/physical activity choices,
  or any other pertinent information needed to provide remedy options, ask the user nicely for the information.
  The user can choose to not provide specific information, if they do warn them that the suggestions
  provided may not be as accurate to their specific case. Based on the information collected, provide
  relevant exercises/stretches they can do to alleviate their pain, the frequency that they should be
  doing the exercise, and viable remedy options. If you don't have a strong answer, recommend the best
  solution while emphasizing the importance of seeking out a medical professional. Return the information
  in a numbered list that is organized and easy to read. 100 words max. The input contains the chat history
  in a list if it exists between AI and user. Just return the final AI message that addresses the issue.
  `;

  // Extract chatHistory from the body of the request
  const { chatHistory, message } = req.body;

  // Construct the prompt by appending chat history and the new message to the base prompt
  let constructedPrompt = basePrompt;
  chatHistory.forEach(chat => {
    if (chat.role === 'user') {
      constructedPrompt += " User: " + chat.content;
    } else {
      constructedPrompt += " AI: " + chat.content;
    }
  });
  constructedPrompt += " User: " + message;

  console.log("Constructed Prompt:", constructedPrompt);

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "system", content: constructedPrompt }],
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

const port = 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
