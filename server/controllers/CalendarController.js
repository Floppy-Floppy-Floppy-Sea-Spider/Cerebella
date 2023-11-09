const models = require('../models/chatroomModel');

const calendarController = {};

calendarController.getEvent = async (req, res) => {
  const { id } = req.params;

  try {
    const event = await CalendarEvent.findById(id);

    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    res.status(200).json(event);
  } catch (error) {
    console.error('Error fetching event:', error);
    res.status(500).json({ error: 'Error fetching event' });
  }
};

calendarController.createEvent = async (req, res) => {
    const { content, day } = req.body;
  
    try {
      if (!content || !day) {
        return res.status(400).json({ error: 'Content and Day are required for the event' });
      }
  
      const existingEvent = await Calendar.findOne({ day });
      if (existingEvent) {
        return res.status(400).json({ error: 'Event for this day already exists' });
      }
  
      const newEvent = new Calendar({ content, day });
      const savedEvent = await newEvent.save();
  
      res.status(201).json(savedEvent);
    } catch (error) {
      console.error('Error creating event:', error);
      res.status(500).json({ error: 'Error creating event' });
    }
  };
  

module.exports = calendarController;
