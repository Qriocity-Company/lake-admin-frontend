import React, { useState, useEffect } from 'react';

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(20);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('desc');
  const host='http://localhost:3001'

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleSort = () => {
    const sortedCustomers = [...filteredCustomers];
  
    if (sortOrder === 'desc') {
      sortedCustomers.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setSortOrder('asc');
    } else {
      sortedCustomers.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      setSortOrder('desc');
    }
  
    setCustomers(sortedCustomers);
  };

  // search according to location or name
  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate index of the last record on the current page
  const indexOfLastRecord = currentPage * recordsPerPage;
  // Calculate index of the first record on the current page
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  // Get current records based on pagination
  const currentRecords = filteredCustomers.slice(indexOfFirstRecord, indexOfLastRecord);

  // Pagination functions
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () => {
    console.log('next page')
    setCurrentPage((prev) => prev + 1);
  }
  const prevPage = () => setCurrentPage((prev) => prev - 1);

  
  const fetchCustomers = async () => {
    try {
      const response = await fetch(`${host}/customer/get-customers`);
      if (response.ok) {
        const data = await response.json();
        setCustomers(data.customers);
        
      } else {
        console.error('Failed to fetch customers');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="h-[90vh] max-h-[90vh] px-8 py-4">
      {/* Search Bar */}

      <div className='flex justify-between items-center'>

        <div className='h-[50px] flex items-center gap-2 border border-[#f64668] rounded-full w-fit p-2 px-4 mb-4'>
          <input
            type="text"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="outline-none border-none p-2 rounded-md"
          />

          <svg className='h-6 w-6 ' xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
          </svg>
        </div>

        <button
          onClick={handleSort}
          className="bg-[#41436a] text-white rounded-md px-6 py-2 h-fit"
        >
          Sort by Date & Time
        </button>
      </div>

      {/* Table */}
      <table className="min-w-full border border-collapse border-[#41436a]">
        {/* Table Header */}
        <thead>
          {/* Table Header Rows */}
          <tr className="bg-[#984063] text-white">
            <th className="py-2 px-4 text-left">S.No</th>
            <th className="py-2 px-4 text-left">Customer Name</th>
            <th className="py-2 px-4 text-left">Age</th>
            <th className="py-2 px-4 text-left">PhNo</th>
            <th className="py-2 px-4 text-left">Location</th>
            <th className="py-2 px-4 text-left">Created On Date</th>
            <th className="py-2 px-4 text-left">Created On Time</th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {/* Map through currentRecords and render table rows */}
          {currentRecords.map((customer, index) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-[#f3f4f6]' : 'bg-white'}>
              <td className="py-2 px-4">{indexOfFirstRecord + index + 1}</td>
              <td className="py-2 px-4">{customer.name}</td>
              <td className="py-2 px-4">{customer.age}</td>
              <td className="py-2 px-4">{customer.number}</td>
              <td className="py-2 px-4">{customer.location}</td>
              <td className="py-2 px-4">{new Date(customer.createdAt).toLocaleDateString()}</td>
              <td className="py-2 px-4">{new Date(customer.createdAt).toLocaleTimeString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4 pb-10  z-50 relative">
        {/* Displaying records range */}
        <p>
          Showing ( {indexOfFirstRecord + 1} - {Math.min(indexOfLastRecord, customers.length)} ) of {customers.length} records
        </p>
        {/* Pagination Buttons */}
        <div className="flex items-center space-x-2">
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className="h-10 w-10 flex items-center justify-center bg-[#41436a] text-white rounded-full cursor-pointer z-50"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-double-left" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M8.354 1.646a.5.5 0 0 1 0 .708L2.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"/>
              <path fill-rule="evenodd" d="M12.354 1.646a.5.5 0 0 1 0 .708L6.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"/>
            </svg>
          </button>
          <span>{currentPage} of {Math.ceil(customers.length / recordsPerPage)}</span>
          <button
            onClick={nextPage}
            disabled={indexOfLastRecord>=filteredCustomers.length}
            className="bg-[#41436a] flex items-center justify-center text-white rounded-full h-10 w-10 cursor-pointer z-50"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-double-right" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M3.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L9.293 8 3.646 2.354a.5.5 0 0 1 0-.708"/>
              <path fill-rule="evenodd" d="M7.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L13.293 8 7.646 2.354a.5.5 0 0 1 0-.708"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Customers;
