const models = require('../models/chatroomModel');

const chatroomController = {}

chatroomController.getMessages = async (req, res) => {
    try {
      const messages = await Chatroom.find();
      res.status(200).json(messages);
    } catch (error) {
      console.error('Error fetching messages:', error);
      res.status(500).json({ error: 'Error fetching messages' });
    }
  }

  chatroomController.createMessage = async (req, res) => {
    const { name, content } = req.body;

    if (!name || !content) {
      return res.status(400).json({ error: 'Please provide both name and content for the message.' });
    }

    try {
      const newMessage = await models.Chatroom.create({ name, content });
      res.status(201).json(newMessage);
    } catch (error) {
      console.error('Error creating message:', error);
      res.status(500).json({ error: 'Error creating message' });
    }
  }

module.exports = chatroomController;