const express = require('express');
const app = express(),
   json = express.json(),
   port = parseInt(process.env.PORT, 10) || 8080;
const fs = require('fs');

// Get the memory
app.get('/mem', (req, res) => {
   fs.readFile(__dirname + '/db/mem.json', (err, data) => {
      if (err) return console.error(err);
      data = JSON.parse(data);
      console.log(data);
      res.json(data);
   });
});

// Set the memory
app.post('/mem', json, (req, res) => {
   fs.readFile(__dirname + '/db/mem.json', (err, data) => {
      if (err) return console.error(err);
      data = JSON.parse(data);
      data.id = req.body.id;
      data.value = req.body.value;
      fs.writeFile(__dirname + '/db/mem.json', JSON.stringify(data), (err) => {
         if (err) return console.error(err);
         res.sendStatus(200);
      });
   });
});

app.listen(port, () => {
   console.log(`Calculator backend listening at http://localhost:${port}`);
});