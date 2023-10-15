import React from 'react';
import { Paper } from '@mui/material';

const MessageBubble = ({ role, content }) => {
  const bubbleClass = role === 'user' ? 'user-bubble' : 'ai-bubble';

  return (
    <Paper className={`chat-bubble ${bubbleClass}`} elevation={3}>
      {content}
    </Paper>
  );
};

export default MessageBubble;
