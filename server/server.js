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
app.get('/*', (req, res) => {
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

// app.use((err, req, res, next) => {
//   console.error('Error:', err.message);
//   console.error('Stack:', err.stack);
//   console.error('Path:', req.path);
//   console.error('Method:', req.method);
//   //console.log testing:
//   if(res.headersSent) {
//     return next(err);
//   }

//   res.status(err.statusCode || 500).json({
//     success: false,
//     message: 'Internal Server Error',
//     error: {
//       message: err.message,
//       stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
//     },
//   });
// });

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});