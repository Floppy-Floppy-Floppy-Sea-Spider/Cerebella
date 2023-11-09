import React, { useEffect, useState } from 'react';
import '../public/chatroom.css';

const Chatroom = () => {
  const [messages, setMessages] = useState([]);
  const [name, setName] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch('http://localhost:3000/chatroom');
        if (response.ok) {
          const data = await response.json();
          setMessages(data);
        }
      } catch (error) {
        console.error('Error fetching message:', error);
      }
    };

    fetchMessages();
  }, []);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (name && content) {
    const newMessage = {
      name,
      content,
      timestamp: new Date().toLocaleString(),
    };
    try {
      const response = await fetch('http://localhost:3000/chatroom', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newMessage),
      });

      if (response.ok) {
        const createdMessage = await response.json();
        setMessages((prevMessages) => [...prevMessages, createdMessage]);
        setContent('');
      } else {
        console.error('Failed to send message');
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  }
  };

  const editMessage = async (id, newContent) => {
    try {
      const response = await fetch(`http://localhost:3000/chatroom/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: newContent }),
      });

      if (response.ok) {
        setMessages((prevMessages) =>
          prevMessages.map((msg) =>
            msg._id === id ? { ...msg, content: newContent } : msg
          )
        );
      } else {
        console.error('Failed to edit message');
      }
    } catch (error) {
      console.error('Error editing message:', error);
    }
  };

  const deleteMessage = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/chatroom/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setMessages((prevMessages) =>
          prevMessages.filter((msg) => msg._id !== id)
        );
      } else {
        console.error('Failed to delete message');
      }
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-form">
        <form onSubmit={sendMessage}>
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Type a message"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <button type="submit">Send</button>
        </form>
      </div>
      <div className="chat-display">
        {messages.map((msg, index) => (
          <div key={index} className="message">
            <strong>{msg.name}: </strong>
            {msg.content}
            <div className="message-actions">
              <button
                onClick={() =>
                  editMessage(msg._id, prompt('Edit message:', msg.content))
                }
              >
                Edit
              </button>
              <button onClick={() => deleteMessage(msg._id)}>Delete</button>
              <span className="timestamp">{msg.timestamp}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Chatroom;
