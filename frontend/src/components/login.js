// Login.js
import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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

  const navigate = useNavigate();

  const handleLogin = () => {
    // Add login logic here
    console.log('Logging in...', email, password);
    try{
      axios.post('http://localhost:3000/login', {
        email,
        password
      })
      .then(res => {
        if(res.status === 200){
          console.log(res)
          localStorage.setItem('id', res.data.id);
          navigate('/Homepage')
        }
        else{
          console.log('Error');
        }
      })
      .catch(err => {
        console.log(err);
      });
    }
    catch(err){
      console.log(err)
    }
  };

  return (
    <LoginForm>
      <h2>Login</h2>
      {/* Add your image here */}
      <input type="email" placeholder="Email" value={email} onChange={handleEmailChange} />
      <input type="password" placeholder="Password" value={password} onChange={handlePasswordChange} />
      <button onClick={handleLogin}>Login</button>
      <button onClick={(e)=>{navigate('/Signup')}}>Signup</button>
      <button onClick={(e)=>{navigate('/Forgot')}}>Forgot Password</button>
    </LoginForm>
  );
};


export default Login;
