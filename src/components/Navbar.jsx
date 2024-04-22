import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const authToken = Cookies.get('authToken');
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('user');
    Cookies.remove('authToken');
    navigate("/");
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [navigate]);

  return (
    <div className="w-full bg-blue-600">
  <div className="flex items-center justify-between px-6 md:px-12 py-2">
    <div className="font-bold text-xl text-white">Admin Panel</div>
    <button
      id="mobileMenuButton"
      className="text-white hover:text-gray-300 focus:outline-none md:hidden"
      onClick={toggleMobileMenu}
    >
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
      </svg>
    </button>
    <div className="hidden md:flex items-center ml-auto">
      <Link to="/home" className="text-white hover:text-gray-300">Home</Link>
      <Link to="/message" className="text-white hover:text-gray-300 ml-4">Messages</Link>
      <Link to="/customers" className="text-white hover:text-gray-300 ml-4">View Customers</Link>
      <Link to="/add-customers" className="text-white hover:text-gray-300 ml-4">Add Customers</Link>
      <button onClick={logout} className="text-white hover:text-gray-300 ml-4 focus:outline-none">Logout</button>
    </div>
  </div>
  <div className={`px-6 py-3 md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
    <Link to="/home" className="block py-2 text-white hover:text-gray-300">Home</Link>
    <Link to="/message" className="block py-2 text-white hover:text-gray-300">Messages</Link>
    <Link to="/customers" className="block py-2 text-white hover:text-gray-300">View Customers</Link>
    <Link to="/add-customers" className="block py-2 text-white hover:text-gray-300">Add Customers</Link>
    <button onClick={logout} className="block py-2 text-white hover:text-gray-300 focus:outline-none">Logout</button>
  </div>
</div>

  );
};

export default Navbar;
