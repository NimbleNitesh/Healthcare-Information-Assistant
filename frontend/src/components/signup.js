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
    axios.post('http://localhost:3000/signup', {
        name,
        email,
        password
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
    console.log('Signing up...', name, email, password);
  };

  return (
    <div className="fullContainer">
      <div className="generalInfo">
        <h1>Healthcare</h1>
      </div>
      <div className="signinBox">
    <SignupForm className='signin'>
      <h2 className='heading'>SignUp</h2>
      {/* Add your image here */}
      <div className="signinWindow">
            <div className="signinData">
      <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
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
