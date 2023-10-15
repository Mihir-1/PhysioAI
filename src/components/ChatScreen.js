import React, { useState, useRef } from 'react';
import { Container, Paper, TextField, Button } from '@mui/material';
import MessageBubble from './MessageBubble';

const ChatScreen = () => {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const chatContainerRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userMessage = { role: 'user', content: message };
    setChatHistory(prevHistory => [...prevHistory, userMessage]);
    setMessage('');

    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;

    setLoading(true);

    const response = await sendMessage(message);
    const aiMessage = { role: 'ai', content: response.message };
    setChatHistory(prevHistory => [...prevHistory, aiMessage]);

    setLoading(false);

    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  };

  const sendMessage = async (message) => {
    const response = await fetch('http://localhost:5000', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message, chatHistory })
    });
    return response.json();
  };

  const chatHistoryStyles = {
    display: 'flex',
    flexDirection: 'column',
    padding: '10px',
    overflowY: 'auto',
    maxHeight: '400px',
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} className="chat-screen" style={{ backgroundColor: '#d3d3d3' }}>
        <div className="chat-history" ref={chatContainerRef} style={chatHistoryStyles}>
          {chatHistory.map((chat, index) => (
            <MessageBubble
              key={index}
              role={chat.role}
              content={chat.content}
            />
          ))}
          {loading && <MessageBubble loading={true} />}
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
            style={{ backgroundColor: '#A076E9' }}
          >
            Submit
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default ChatScreen;
