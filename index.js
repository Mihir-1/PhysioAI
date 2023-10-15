const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

// Use bodyParser middleware to parse JSON data in request bodies
app.use(bodyParser.json());

// Enable CORS for all routes
app.use(cors());

// Define a simple route that accepts POST requests
app.post('/', (req, res) => {
  res.json({
    message: "Hello World!"
  });
});

// Start the Express server
const port = 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
