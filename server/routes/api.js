const express = require('express');
const calendarController = require('../controllers/CalendarController');
const chatroomController = require('../controllers/ChatroomController');
const router = express.Router();


router.get('/', (req, res) => {
    res.send('Hello from API')
})

// router.get('/calendar', calendarController.getdate);

// router.post('/pets', petController.addPet);

// router.delete('/pets/:id', petController.deletePet);

// router.patch('/pets/:id', petController.updatePet); 

router.post('/login', userController.login);

module.exports = router;
