// Signup.js

import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import "./signup.css";
import axios from 'axios';
const SignupForm = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  max-width: 400px;
`;

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const handleSignup = () => {
    // Add signup logic here
    // axios.post('http://localhost:8080/signup', {
      if (!name || !email || !password) {
        alert('Please fill in all fields');
        return;
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if(!emailRegex.test(email)){
        alert('Enter Valid Email Id');
        return ;
      }
    axios.post('https://healthcarellm-srq1.onrender.com/signup', {
        name,
        email,
        password
      })
      .then(res => {
        if(res.status === 200){
          alert('Check mail for verifiy the Email Id')
          navigate('/Login')
        }
        else if(res.status === 201){
          alert('Email Id already in use');
          setEmail('');
          setName('');
          setPassword('');
        }
        else{
          console.log('Error');
        }
      })
      .catch(err => {
        console.log(err);
      });
    // console.log('Signing up...', name, email, password);
  };

  return (
    <div className="fullContainer">
      <div className="generalInfo">
      <h1 className="about">A tool that assists users in understanding medical information. The interface could allow users to input symptoms, and the system could provide information on potential health issues, treatment options, and preventive measures in an easy-to-understand format.</h1>
      </div>
      <div className="loginBox">
    <SignupForm className='signin'>
      <h2 className='heading'>SignUp</h2>
      {/* Add your image here */}
      <div className="signinWindow">
            <div className="signinData">
      <input type="text" className='inputbox' placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <input type="email" className='inputbox' placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" className='inputbox' placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button className="signinButton" onClick={handleSignup}>Signup</button>
      </div>
      <div className='already'>Already have an account ?  
      <button className="otherButton" onClick={(e)=>{navigate('/Login')}}>Login</button>
      </div>
    </SignupForm>
    </div>
    </div>
  );
};

export default Signup;
