import React, { useState } from 'react';

const AddCustomers = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [phNo, setPhNo] = useState('');
  const [location, setLocation] = useState('');
  
  const host="http://localhost:3001"
  const handleAddCustomer = async () => {
    try {
      const response = await fetch(`${host}/customer/create-customer`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          age,
          number:phNo,
          location,
        }),
      });

      if (response.ok) {
        // Customer added successfully, you can redirect or show a success message
        const data = await response.json();
        console.log(data);
        alert('Customer added successfully');
      } else {
        console.error('Failed to add customer');
      }
      setAge('');
      setName('');
      setPhNo('');
      setLocation('');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="h-[90vh] bg-[#ffe0c6] flex items-center justify-center">
      <div className="bg-[#41436a] w-[35vw] text-white p-8 rounded-3xl">
        <h2 className="text-2xl font-semibold mb-4">Add Customer</h2>
        <form>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1">Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="p-2 border border-gray-300 rounded-md w-full text-black"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1">Age:</label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="p-2 border border-gray-300 rounded-md w-full text-black"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1">Phone Number:</label>
            <input
              type="text"
              value={phNo}
              onChange={(e) => setPhNo(e.target.value)}
              className="p-2 border border-gray-300 rounded-md w-full text-black"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1">Location:</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="p-2 border border-gray-300 rounded-md w-full text-black"
            />
          </div>
          <button
            type="button"
            onClick={handleAddCustomer}
            className="bg-[#f64668] mt-2 text-white py-2 px-4 rounded-md cursor-pointer"
          >
            Add Customer
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCustomers;
