const models = require('../models/chatroomModel');

const chatroomController = {};

chatroomController.getMessages = async (req, res) => {
  try {
    const messages = await models.Chatroom.find();
    res.status(200).json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ error: 'Error fetching messages' });
  }
};

chatroomController.createMessage = async (req, res) => {
  const { name, content } = req.body;

  if (!name || !content) {
    return res
      .status(400)
      .json({ error: 'Please provide both name and content for the message.' });
  }

  try {
    const newMessage = await models.Chatroom.create({ name, content });
    res.status(201).json(newMessage);
  } catch (error) {
    console.error('Error creating message:', error);
    res.status(500).json({ error: 'Error creating message' });
  }
};

chatroomController.editMessage = async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;

  try {
    const updatedMessage = await models.Chatroom.findByIdAndUpdate(
      id,
      { content },
      { new: true }
    );

    if (!updatedMessage) {
      return res.status(404).json({ error: 'Message not found' });
    }

    res.status(200).json(updatedMessage);
  } catch (error) {
    console.error('Error editing message:', error);
    res.status(500).json({ error: 'Error editing message' });
  }
};

chatroomController.deleteMessage = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedMessage = await models.Chatroom.findByIdAndDelete(id);
    res.status(200).json(deletedMessage);
  } catch (error) {
    console.error('Error deleting message:', error);
    res.status(500).json({ error: 'Error deleting message' });
  }
};

module.exports = chatroomController;
