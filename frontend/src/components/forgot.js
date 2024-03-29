// ForgotPassword.js

import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import "./forgot.css";
import { useNavigate } from 'react-router-dom';
const ForgotPasswordForm = styled.div`
  background-color: rgb(0 255 125 / 75%);
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
  const [loading, setLoading] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);
  const handleForgotPassword = () => {
    // Add forgot password logic here
    // console.log('Forgot password...', email);
    // axios.post('http://localhost:8080/forgot', {
      if (loading) {
        // If the button is already in a loading state, return early to prevent multiple clicks
        return;
      }
    if(!email || !newpassword || !confirmpassword){
      alert('Please Enter all fields')
      // setEmail('');
        setPassword('');
        setconfirmPassword('');
      return
    }
    else if(newpassword!==confirmpassword){
      alert('Confirm Password does not match');
      // setEmail('');
        setPassword('');
        setconfirmPassword('');
        return
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if(!emailRegex.test(email)){
        alert('Enter Valid Email Id');
        setEmail('');
        setPassword('');
        setconfirmPassword('');
        return ;
      }
      {
        setLoading(true);
    axios.post('https://healthcarellm-srq1.onrender.com/forgot2', {
        email,
        newpassword
      })
      .then(res => {
        if(res.status === 200){
          // console.log(res)
          alert('Password Successfully Reset')
          navigate('/Login')
        }
        else if(res.status===201){
          alert('Wrong Email Id');
          setEmail('');
        setPassword('');
        setconfirmPassword('');
        }
        else if(res.status===202){
          alert('Email has not been verified')
          setEmail('');
        setPassword('');
        setconfirmPassword('');
        }
        else{
          console.log('Error');
        }
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
    }
    // console.log('Signing up...',email, newpassword);
  };

  const confirmhandleForgotPassword=()=>{
    if(!email){
      alert('Please Enter Email ID')
      return
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if(!emailRegex.test(email)){
        alert('Enter Valid Email Id');
        setEmail('');
        return ;
      }
      axios.post('https://healthcarellm-srq1.onrender.com/forgot', {
        email
      })
      .then(res => {
        
        })
      .catch(err=>{

        });
    alert('Please confirm your Email ID on mail');
    setShowResetPassword(true);

  }

  return (
    <div className="fullContainer">
      <div className="generalInfo">
      <h1 className="about">A tool that assists users in understanding medical information. The interface could allow users to input symptoms, and the system could provide information on potential health issues, treatment options, and preventive measures in an easy-to-understand format.</h1>
    
      </div>
      <div className="loginBox">
    <ForgotPasswordForm className='forgot'>
      <h2 className='heading'>Forgot Password</h2>
      {/* Add your image here */}
      <div className="forgotWindow">
            <div className="forgotData">
      <input type="email" className='inputbox' placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <button className="forgotButton" onClick={confirmhandleForgotPassword}>Confirm Email</button>
      {showResetPassword && (
                <>
                  <input type="newpassword" className='inputbox' placeholder="New Password" value={newpassword} onChange={(e) => setPassword(e.target.value)} />
                  <input type="confirmpassword" className='inputbox' placeholder="Re-Enter Password" value={confirmpassword} onChange={(e) => setconfirmPassword(e.target.value)} />
                  <button className="forgotButton" onClick={handleForgotPassword}>Reset Password</button>
                </>
              )}
              </div>
              </div>
    </ForgotPasswordForm>
    </div>
    </div>
  );
};

export default ForgotPassword;
