import React from 'react';

const PrivacyPolicyScreen = ({ onAccept }) => (
  <div className="privacy-policy-screen">
    <h1>Privacy Policy</h1>
    {/* Remaining content goes here */}
    <button onClick={onAccept} className="accept-btn">Accept Policy →</button>
  </div>
);

export default PrivacyPolicyScreen;