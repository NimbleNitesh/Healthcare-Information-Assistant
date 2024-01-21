// ForgotPassword.js

import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const ForgotPasswordForm = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  max-width: 400px;
`;

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [newpassword, setPassword] = useState('');
  const [confirmpassword, setconfirmPassword] = useState('');
  const navigate = useNavigate();
  const handleForgotPassword = () => {
    // Add forgot password logic here
    console.log('Forgot password...', email);
    axios.post('http://localhost:3000/forgot', {
        email,
        newpassword,
        confirmpassword
      })
      .then(res => {
        if(res.status === 200){
          console.log(res)
          navigate('/Login')
        }
        else{
          console.log('Error');
        }
      })
      .catch(err => {
        console.log(err);
      });
    console.log('Signing up...',email, newpassword);
  };

  return (
    <ForgotPasswordForm>
      <h2>Forgot Password</h2>
      {/* Add your image here */}
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="newpassword" placeholder="New Password" value={newpassword} onChange={(e) => setPassword(e.target.value)} />
      <input type="confirmpassword" placeholder="Re-Enter Password" value={confirmpassword} onChange={(e) => setconfirmPassword(e.target.value)} />
      <button onClick={handleForgotPassword}>Reset Password</button>
    </ForgotPasswordForm>
  );
};

export default ForgotPassword;
