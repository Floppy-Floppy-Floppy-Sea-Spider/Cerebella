const express = require('express');
const calendarController = require('../controllers/calendarController');
const chatroomController = require('../controllers/chatroomController');
const userController = require('../controllers/UserController');
const router = express.Router();

// router.get('/', (req, res) => {
//   res.send('Hello from API');
// });

router.get('/chatroom', chatroomController.getMessages);

router.post('/chatroom', chatroomController.createMessage);

router.put('/chatroom/:id', chatroomController.editMessage);

router.delete('/chatroom/:id', chatroomController.deleteMessage);

router.get('/calendar/:id', calendarController.getEvent);

router.post('/calendar', calendarController.createEvent);

// router.post('/login', userController.login);

module.exports = router;
