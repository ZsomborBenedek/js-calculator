const express = require('express');
const app = express(),
   json = express.json,
   port = parseInt(process.env.PORT, 10) || 8080;


// Get the memory
app.get('/mem', (req, res) => {
   console.log('This is a GET request');
});

// Set the memory
app.post('/mem', json, (req, res) => {
   console.log('This is a POST request');
});

app.listen(port, () => {
   console.log(`Calculator backend listening at http://localhost:${port}`);
});