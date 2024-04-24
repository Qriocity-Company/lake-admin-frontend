import React,{useState} from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';

import Navbar from './components/Navbar';

import Home from './pages/Home'
import Messages from './pages/Messages';
import UpdateFeatures from './components/UpdateFeatures';
import Gallery from './pages/Gallery';



function App() {
  
  return (
    <div className='w-full'>
      <Router>
        {/* Navbar is rendered conditionally */}
        <Routes>
          {/* Public routes without Navbar */}
          <Route path="/" element={<Login />} />
          
          {/* Routes with Navbar */}
          <Route
            path="/*"
            element={
              <>
                <Navbar/>
                <Routes>
                  <Route path='/home' element={ <Home/> } />
                  <Route path='/message' element={<Messages/>} />
                  <Route path='/features' element={<UpdateFeatures/>} />
                  <Route path='/gallery' element={<Gallery/>} />
                </Routes>
              </>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
