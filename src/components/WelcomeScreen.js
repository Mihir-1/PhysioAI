import React from 'react';
const WelcomeScreen = ({ onGetStarted }) => (
  <div className="welcome-screen">
    <div className="header">
      <h1>Welcome to PhysioAI</h1>
      <p>Your intelligent Physical Therapy Assistant</p>
    </div>
    <div className="robot-image">
      {/* Add your robot image or illustration here */}
    </div>
    <button onClick={onGetStarted} className="get-started-btn">Get Started →</button>
  </div>
);

export default WelcomeScreen;
