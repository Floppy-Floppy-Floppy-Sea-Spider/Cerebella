const chatroomController = require('../server/controllers/chatroomController');
const { Chatroom } = require('../server/models/chatroomModel');
const calendarController = require('../server/controllers/calendarController');
const { Calendar } = require('../server/models/calendarModel');

// Mock the Chatroom model
jest.mock('../server/models/chatroomModel');

describe('Chatroom Controller', () => {
  describe('getMessages', () => {
    it('should return a list of messages when successful', async () => {
      // Mock the find method to return a predefined array of messages
      Chatroom.find.mockResolvedValue([
        { name: 'User1', content: 'Hello' },
        { name: 'User2', content: 'Hi there' },
      ]);

      const req = {};
      const res = {
        status: jest.fn(() => res),
        json: jest.fn(),
      };

      await chatroomController.getMessages(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith([
        { name: 'User1', content: 'Hello' },
        { name: 'User2', content: 'Hi there' },
      ]);
    });

    it('should handle errors when fetching messages', async () => {
      // Mock the find method to throw an error
      Chatroom.find.mockRejectedValue(new Error('Test error'));

      const req = {};
      const res = {
        status: jest.fn(() => res),
        json: jest.fn(),
      };

      await chatroomController.getMessages(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Error fetching messages' });
    });
  });

  describe('createMessage', () => {
    it('should create a message when provided with valid data', async () => {
      const req = {
        body: { name: 'User1', content: 'New message' },
      };
      const res = {
        status: jest.fn(() => res),
        json: jest.fn(),
      };

      await chatroomController.createMessage(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        name: 'User1',
        content: 'New message',
      });
    });

    it('should handle missing data when creating a message', async () => {
      const req = {
        body: { name: 'User1' }, // Missing 'content'
      };
      const res = {
        status: jest.fn(() => res),
        json: jest.fn(),
      };

      await chatroomController.createMessage(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        error: 'Please provide both name and content for the message.',
      });
    });

    it('should handle errors when creating a message', async () => {
      // Mock the create method to throw an error
      Chatroom.create.mockRejectedValue(new Error('Test error'));

      const req = {
        body: { name: 'User1', content: 'New message' },
      };
      const res = {
        status: jest.fn(() => res),
        json: jest.fn(),
      };

      await chatroomController.createMessage(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Error creating message' });
    });
  });
});

// Mock the Calendar model
jest.mock('../server/models/calendarModel');

describe('Calendar Controller', () => {
  describe('getEvent', () => {
    it('should return an event when provided with a valid ID', async () => {
      const sampleEvent = {
        _id: '12345',
        day: 1,
        content: 'Sample event',
      };

      // Mock the findById method to return the sample event
      Calendar.findById.mockResolvedValue(sampleEvent);

      const req = { params: { id: '12345' } };
      const res = {
        status: jest.fn(() => res),
        json: jest.fn(),
      };

      await calendarController.getEvent(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(sampleEvent);
    });

    it('should handle "Event not found" when the provided ID is not found', async () => {
      // Mock the findById method to return null (no event found)
      Calendar.findById.mockResolvedValue(null);

      const req = { params: { id: 'nonexistentID' } };
      const res = {
        status: jest.fn(() => res),
        json: jest.fn(),
      };

      await calendarController.getEvent(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Event not found' });
    });

    it('should handle errors when fetching an event', async () => {
      // Mock the findById method to throw an error
      Calendar.findById.mockRejectedValue(new Error('Test error'));

      const req = { params: { id: '12345' } };
      const res = {
        status: jest.fn(() => res),
        json: jest.fn(),
      };

      await calendarController.getEvent(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Error fetching event' });
    });
  });

  describe('createEvent', () => {
    it('should create an event when provided with valid data', async () => {
      const req = {
        body: { content: 'New event', day: 2 },
      };

      // Mock the findOne method to return null (no event exists for the day)
      Calendar.findOne.mockResolvedValue(null);

      // Mock the create method to return the created event
      Calendar.create.mockResolvedValue(req.body);

      const res = {
        status: jest.fn(() => res),
        json: jest.fn(),
      };

      await calendarController.createEvent(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(req.body);
    });

    it('should handle missing data when creating an event', async () => {
      const req = {
        body: { content: 'New event' }, // Missing 'day'
      };
      const res = {
        status: jest.fn(() => res),
        json: jest.fn(),
      };

      await calendarController.createEvent(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        error: 'Content and Day are required for the event',
      });
    });

    it('should handle an existing event for the same day', async () => {
      const existingEvent = { content: 'Existing event', day: 2 };

      // Mock the findOne method to return an existing event
      Calendar.findOne.mockResolvedValue(existingEvent);

      const req = {
        body: { content: 'New event', day: 2 }, // Same 'day' as existing event
      };
      const res = {
        status: jest.fn(() => res),
        json: jest.fn(),
      };

      await calendarController.createEvent(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Event for this day already exists' });
    });

    it('should handle errors when creating an event', async () => {
      // Mock the create method to throw an error
      Calendar.create.mockRejectedValue(new Error('Test error'));

      const req = { body: { content: 'New event', day: 2 } };
      const res = {
        status: jest.fn(() => res),
        json: jest.fn(),
      };

      await calendarController.createEvent(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Error creating event' });
    });
  });
});
