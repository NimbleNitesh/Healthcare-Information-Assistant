// Login.js
import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const LoginForm = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  max-width: 400px;
`;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = () => {
    // Add login logic here
    console.log('Logging in...', email, password);
    axios.post('http://localhost:3000/login', {
      email,
      password
    })
  };

  return (
    <LoginForm>
      <h2>Login</h2>
      {/* Add your image here */}
      <input type="email" placeholder="Email" value={email} onChange={handleEmailChange} />
      <input type="password" placeholder="Password" value={password} onChange={handlePasswordChange} />
      <button onClick={handleLogin}>Login</button>
    </LoginForm>
  );
};


export default Login;
