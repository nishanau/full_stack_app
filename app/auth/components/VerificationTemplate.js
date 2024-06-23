import React from 'react';

const VerificationTemplate = ({ username, verificationUrl }) => (
  <div>
    <h1>Welcome to Nishan's eCommerce Platform</h1>
    <p>Hi {username},</p>
    <p>Please verify your email by clicking the link below:</p>
    <a href={verificationUrl}>Verify Email</a>
  </div>
);

export default VerificationTemplate;
