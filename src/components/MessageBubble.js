import { Paper } from '@mui/material';
import { styled } from '@mui/system';
import React from 'react';

const UserBubble = styled(Paper)({
  background: '#A076E9',
  color: 'white',
  padding: '8px',
  borderRadius: '0 10px 10px 10px',
  maxWidth: '80%',
  marginBottom: '8px',
  alignSelf: 'flex-end',
  textAlign: 'left'
});

const AIBubble = styled(Paper)({
  background: '#F3F3F3',
  color: 'black',
  padding: '8px',
  borderRadius: '10px 10px 10px 0',
  maxWidth: '80%',
  marginBottom: '8px',
  alignSelf: 'flex-start',
  textAlign: 'left'
});

const LoadingDot = styled('div')({
  background: '#F3F3F3',
  borderRadius: '50%',
  width: '10px',
  height: '10px',
  margin: '0 5px',
  animation: 'bounce 0.6s infinite alternate',
  '@keyframes bounce': {
    '0%': { transform: 'translateY(0)' },
    '100%': { transform: 'translateY(-10px)' },
  },
});

const LoadingAnimation = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '80%',
  marginBottom: '8px',
});

const MessageBubble = ({ role, content, loading }) => {
  if (loading) {
    return (
      <LoadingAnimation>
        <LoadingDot />
        <LoadingDot />
        <LoadingDot />
      </LoadingAnimation>
    );
  } else if (role === 'user') {
    return <UserBubble elevation={3}>{content}</UserBubble>;
  } else {
    return <AIBubble elevation={3}>{content}</AIBubble>;
  }
};

export default MessageBubble;
