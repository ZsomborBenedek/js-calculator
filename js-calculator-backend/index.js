const express = require('express');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const app = express(),
   json = express.json(),
   port = parseInt(process.env.PORT, 10) || 3000;

const sessionStore = new FileStore({ path: __dirname + '/sessions/' });

app.use(session({
   secret: 'reEQvr5hftvdtvgss54cIc4g',
   resave: false,
   saveUninitialized: false,
   store: sessionStore,
   cookie: { maxAge: 3600000, secure: false, httpOnly: true }
}));

// Get the memory
app.get('/api/mem', (req, res) => {
   try {
      sessionStore.get(req.sessionID, function (err, session) {
         if (session) {
            return err ? res.sendStatus(500) : res.json({ "memory": session.memory });
         } else {
            return res.sendStatus(404);
         }
      });
   } catch (error) {
      console.error(error);
      return res.sendStatus(500);
   }
});

// Set the memory
app.post('/api/mem', json, (req, res) => {
   try {
      req.session.memory = parseInt(req.body.memory);
      sessionStore.set(req.sessionID, req.session, function (err) {
         return err ? res.sendStatus(500) : res.sendStatus(200);
      });
   } catch (error) {
      console.error(error);
      return res.sendStatus(500);
   }
});

app.listen(port, () => {
   console.log(`Calculator backend listening at http://localhost:${port}`);
});