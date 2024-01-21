// ForgotPassword.js

import React, { useState } from 'react';
import styled from 'styled-components';

const ForgotPasswordForm = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  max-width: 400px;
`;

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const handleForgotPassword = () => {
    // Add forgot password logic here
    console.log('Forgot password...', email);
  };

  return (
    <ForgotPasswordForm>
      <h2>Forgot Password</h2>
      {/* Add your image here */}
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <button onClick={handleForgotPassword}>Reset Password</button>
    </ForgotPasswordForm>
  );
};

export default ForgotPassword;
