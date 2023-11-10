const express = require('express');
const path = require('path');
const router = require('./routes/api');
const cors = require('cors');

const app = express();
const PORT = 3000; 

app.use(cors());

//PARSING REQUEST
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '../client/public')));

// Route handler to respond with main app
app.get('/', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '../client/public/index.html'));
});

app.use('/', router);

// CATCH-ALL ROUTE HANDLER
app.use('*', (req, res) => res.sendStatus(404));

// GLOBAL ERROR HANDLER
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign(defaultErr, err);
  console.log(errorObj.log);

  return res.status(errorObj.status).send(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

module.exports = app;