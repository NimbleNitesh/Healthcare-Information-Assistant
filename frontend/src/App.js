// App.js

import React from 'react';
import { BrowserRouter as Router, Route,Routes} from 'react-router-dom';

import styled from 'styled-components';
import Login from './components/login';
import Signup from './components/signup';
import ForgotPassword from './components/forgot';
import Home from './components/home';


const AppContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f8f8f8;
`;

const App = () => {
  return (
    <Router>
      <Routes>
      {/* <Route path="/" element={<Login/>} /> */}
      <Route path="/Login" element={<Login/>} />
        <Route path="/Homepage" element={<Home/>} />
        <Route path="/Signup" element={<Signup/>} />
        <Route path="/Forgot" element={<ForgotPassword/>} />
      </Routes>
    </Router>
  );
};

export default App;
