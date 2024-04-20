import { X } from 'lucide-react';
import React, { useState } from 'react';
import axios from 'axios';

const ContactModal = ({ setContactModal }) => {
  const host = 'https://lake-paradise-admin.onrender.com';
  const userId = JSON.parse(localStorage.getItem('user'))?._id;

  const [phone1, setPhone1] = useState('');
  const [phone2, setPhone2] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${host}/hotel/update-contacts`, {
        method: "POST",
        body: JSON.stringify({
          contacts: [ phone1, phone2 ],
          userId: userId,
          hotelId: "66221c2cce3f47d7d06cd26a"
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();
      console.log(data);
      if (data.success) {
        alert(data.message);
        window.location.reload();
      } else {
        alert("There was some error. Please try again later.");
      }
    } catch (error) {
      console.error("Error updating Contacts:", error);
      // Handle error
    }
  };

  return (
    <div className='fixed top-0 left-0 h-[100vh] w-[100vw] z-50 bg-[rgba(0,0,0,0.7)] flex items-center justify-center'>
      <div className='w-[43vw] relative flex flex-col p-6 justify-center items-center rounded-xl bg-white shadow-lg'>
        <X className='h-6 w-6 absolute top-4 right-4 cursor-pointer' onClick={() => setContactModal(false)} />
        <h3 className='text-xl font-bold mb-4'>Update Contact Details:</h3>
        
        <div className="mb-4">
          <input
            type="text"
            placeholder="Enter Phone Number 1"
            value={phone1}
            onChange={(e) => setPhone1(e.target.value)}
            className="px-4 py-2 w-full border border-gray-300 rounded-lg"
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Enter Phone Number 2"
            value={phone2}
            onChange={(e) => setPhone2(e.target.value)}
            className="px-4 py-2 w-full border border-gray-300 rounded-lg"
          />
        </div>
        
        <button className='px-6 py-2 bg-blue-500 rounded-xl hover:bg-blue-600 text-white mb-2 text-xl' onClick={handleSubmit}>Update</button>
      </div>
    </div>
  );
};

export default ContactModal;
