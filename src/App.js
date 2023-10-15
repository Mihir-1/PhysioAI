import React, { useState } from 'react';
import './App.css';
import WelcomeScreen from './components/WelcomeScreen';
import PrivacyPolicyScreen from './components/PrivacyPolicyScreen';
import ChatScreen from './components/ChatScreen';


function App() {
  const [screen, setScreen] = useState('welcome');


  return (
    <div className="App">
      {screen === 'welcome' && <WelcomeScreen onGetStarted={() => setScreen('privacy')} />}
      {screen === 'privacy' && <PrivacyPolicyScreen onAccept={() => setScreen('chat')} />}
      {screen === 'chat' && <ChatScreen/>}
    </div>
  );
}

export default App;