import React, { useEffect, useState } from 'react';
import '/Users/yvonneqtram/Cerebella/client/public/chatroom.css';

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
          setMessages((prevMessages) => [...prevMessages, newMessage]);
          setContent('');
        } else {
          console.error('Failed to send message');
        }
      } catch (error) {
        console.error('Error sending message:', error);
      }
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default Chatroom;
