import React,{useState} from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';

import Navbar from './components/Navbar';

import Home from './pages/Home'
import Customers from './pages/Customers'
import AddCustomers from './pages/AddCustomers';


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
                  <Route path='/customers' element={ <Customers/> } />
                  <Route path='/add-customers' element={ <AddCustomers/> } />
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
