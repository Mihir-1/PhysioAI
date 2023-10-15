import React, { useState, useRef } from 'react';
import { Container, Paper, TextField, Button } from '@mui/material';
import MessageBubble from './MessageBubble'; // Import the MessageBubble component

const ChatScreen = () => {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const chatContainerRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userMessage = { role: 'user', content: message };
    const updatedChatHistory = [...chatHistory, userMessage];
    setChatHistory(updatedChatHistory);

    setMessage('');

    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;

    const response = await sendMessage(message);
    const aiMessage = { role: 'ai', content: response.message };
    const updatedChatHistoryWithResponse = [...updatedChatHistory, aiMessage];
    setChatHistory(updatedChatHistoryWithResponse);

    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  };

  const sendMessage = async (message) => {
    const response = await fetch('http://localhost:5000', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message })
    });
    return response.json();
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} className="chat-screen">
        <div className="chat-history" ref={chatContainerRef}>
          {chatHistory.map((chat, index) => (
            <MessageBubble
              key={index}
              role={chat.role}
              content={chat.content}
            />
          ))}
        </div>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            variant="outlined"
            label="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
          >
            Submit
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default ChatScreen;
