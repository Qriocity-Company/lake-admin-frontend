import React, { useEffect, useState } from 'react';
import png from "../assets/png2.webp";
import { Link } from 'react-router-dom';
import UpdatePriceModal from '../components/UpdatePriceModal';
import DateBookingModal from '../components/DateBookingModal';
import HeroModal from '../components/HeroModal';
import BannerModal from '../components/BannerModal';
import AboutModal from '../components/AboutModal';
import useFetch from '../hooks/useFetch';
import CollageModal from '../components/CollageModal';
import ContactModal from '../components/ContactModal';
const hotelId = import.meta.env.VITE_HOTEL_ID;

const Home = () => {
  
  
  const { data, loading, error } = useFetch(`https://lake-paradise-admin.onrender.com/hotel/get-hotel`);
  console.log(data.hotel);
  
  // Initial date state (current month and year)
  const [date, setDate] = useState(new Date());
  // State to keep track of selected dates
  const [selectedDates, setSelectedDates] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [openHeroModal, setHeroModal] = useState(false);
  const [openAboutModal, setAboutModal] = useState(false);
  const [openBannerModal, setBannerModal] = useState(false);
  const [openCollageModal, setCollageModal] = useState(false);
  const [openContactModal, setContactModal] = useState(false);
  const [bookingModal, setBookingModal] = useState(false);
  const [dates, setDates] = useState([]);
  const [defaultPrice, setDefaultPrice] = useState('');

  // Function to change month
  const changeMonth = (amount) => {
    setDate(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setMonth(newDate.getMonth() + amount);
      return newDate;
    });
  };

  // Function to change year
  const changeYear = (amount) => {
    setDate(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setFullYear(newDate.getFullYear() + amount);
      return newDate;
    });
  };

  // Function to get month and year in readable format
  const getMonthYear = () => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    return `${month} ${year}`;
  };

  // Function to get number of days in a month
  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  // Function to get first day of the month
  const getFirstDayOfMonth = () => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  // Function to render calendar days
  const renderCalendarDays = () => {
    const firstDay = getFirstDayOfMonth();
    const totalDays = getDaysInMonth(date.getMonth(), date.getFullYear());
    const days = [];

    // Add empty placeholders for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div className="empty-day" key={`empty-${i}`}></div>);
    }

    // Add numbered days for the month
    for (let i = 1; i <= totalDays; i++) {
      const currentDate = new Date(date.getFullYear(), date.getMonth(), i);
      const isSelected = selectedDates.some(selectedDate => selectedDate.getTime() === currentDate.getTime());
      const bookedDate = dates.find(d => new Date(d.date).getTime() === currentDate.getTime());
      const isBooked = bookedDate ? bookedDate.booked : false;
      const price = bookedDate ? bookedDate.price : defaultPrice;

      days.push(
        <div
          onClick={() => manageDate(currentDate)}
          className={`bg-blue-200 cursor-pointer flex flex-col items-center gap-4 py-4 calendar-day ${isSelected ? 'bg-teal-400' : ''} ${isBooked ? 'bg-zinc-500' : ''}`}
          key={`day-${i}`}
        >
          <p className={isBooked ? 'line-through' : ''}>{i}</p>
          <p className='bg-blue-500 rounded-xl px-3 py-1 w-fit h-fit shadow-md text-white text-sm  shadow-black'>${price}</p>
        </div>
      );
    }

    return days;
  };

  // Function to manage date selection
  const manageDate = (selectedDate) => {
    const index = selectedDates.findIndex(date => date.getTime() === selectedDate.getTime());
    if (index === -1) {
      // If the date is not already selected, add it to the selected dates array
      setSelectedDates([...selectedDates, selectedDate]);
    } else {
      // If the date is already selected, remove it from the selected dates array
      const updatedDates = [...selectedDates];
      updatedDates.splice(index, 1);
      setSelectedDates(updatedDates);
    }
  };

  const userId = JSON.parse(localStorage.getItem('user'))?.id;
  const host = 'https://lake-paradise-admin.onrender.com';

  const fetchDates = async () => {
    try {
      const response = await fetch(`${host}/date/get-all-dates`);
      const data = await response.json();
      setDates(data.dates);
    } catch (error) {
      console.error('Error fetching dates:', error);
    }
  };

  const fetchDefaultPrice = async () => {
    try {
      const response = await fetch(`${host}/hotel/get-default-price/66221c2cce3f47d7d06cd26a`);
      const data = await response.json();
      setDefaultPrice(data.defaultPrice);
    } catch (error) {
      console.error('Error fetching default price:', error);
    }
  };

  useEffect(() => {
    fetchDates();
    fetchDefaultPrice();
  }, []);

  return (
    <div className='min-h-[90vh] bg-white  relative w-full flex flex-col items-center justify-center'>
      <div className='w-[70vw] h-[90vh] mb-12 flex flex-col items-center p-12'>
        <h2 className='text-xl font-semibold'>Manage your Calendar</h2>
        <div className='w-full'>
          <div className="flex items-center justify-between">
            <button onClick={() => changeMonth(-1)}>&#9664;</button>
            <span>{getMonthYear()}</span>
            <button onClick={() => changeMonth(1)}>&#9654;</button>
          </div>
          <div className="mt-4">
            <div className="grid grid-cols-7 gap-2 text-center">
              <div className="font-semibold">Sun</div>
              <div className="font-semibold">Mon</div>
              <div className="font-semibold">Tue</div>
              <div className="font-semibold">Wed</div>
              <div className="font-semibold">Thu</div>
              <div className="font-semibold">Fri</div>
              <div className="font-semibold">Sat</div>
              {renderCalendarDays()}
            </div>
          </div>
          <div className="flex justify-end mb-6 gap-6">
            <button onClick={() => setOpenModal(true)} className="bg-blue-500 text-white px-4 py-2 mt-4 rounded-md hover:bg-blue-600 shadow-lg shadow-black">Update Prices</button>
            <button onClick={() => setBookingModal(true)} className="bg-blue-500 text-white px-4 py-2 mt-4 rounded-md hover:bg-blue-600 shadow-lg shadow-black">Book Dates</button>
          </div>
        </div>
      </div>
      {openModal && <UpdatePriceModal setOpenModal={setOpenModal} dates={selectedDates}/>}
      {bookingModal && <DateBookingModal setOpenModal={setBookingModal} dates={selectedDates}/>}

      <div className=' relative w-[70vw] h-[50vh] mb-12 flex justify-center items-center '>
        <h1 className=' bg-black bg-opacity-20 text-white absolute font-bold font-serif z-50 top-0 left-0 right-0 text-center text-lg'>Hero Image</h1>
        <img src={data.hotel?.heroImage} alt="" className=' w-full h-full rounded-lg' />
        <button  onClick={() => setHeroModal(true) } className="absolute z-50 bg-blue-700 p-3 px-8 font-serif bg-opacity-80 hover:bg-blue-700  text-white rounded-full right-30">update</button>
        
      </div>
      <div className=' relative w-[70vw] h-[50vh] mb-12 flex justify-center items-center '>
      <h1 className=' bg-black bg-opacity-20 text-white absolute font-serif font-bold z-50 top-0 left-0 right-0 text-center text-lg'>About Image</h1>
        <img src={data.hotel?.aboutImage} alt="" className=' w-full h-full rounded-lg' />
        <button onClick={() => setAboutModal(true) } className="absolute z-50 bg-blue-700 p-3 px-8 font-serif bg-opacity-80 hover:bg-blue-700  text-white rounded-full right-30">update</button>
        
      </div>
      <div className=' relative w-[70vw] h-[70vh] mb-12 flex flex-wrap justify-center items-center'>
      {data.hotel?.hotelImages.map((image, index) => (
          <div key={index} className=' relative w-1/2 h-1/2 p-1'>
            <img src={image.img} alt={`Hotel Image ${index + 1}`} className=' w-full h-full' />
            <div className=' text-white absolute font-serif font-bold z-50 top-1 px-1 left-0 right-0 text-center text-lg'>
            <h1 className='bg-black bg-opacity-20'>{image.title}</h1>
            </div>
          </div>
        ))}
         <button onClick={() => setCollageModal(true)}className="absolute z-50 bg-blue-600  py-5 px-10 font-serif  hover:bg-blue-700  text-white rounded-full right-30">update</button>
       
      </div>

      <div className=' relative w-[70vw] h-[50vh] mb-12 flex justify-center items-center '>
      <h1 className=' bg-black bg-opacity-20 text-white absolute font-serif font-bold z-50 top-0 left-0 right-0 text-center text-lg'>Bottom Banner Image</h1>
        <img src={data.hotel?.bottomBanner} alt="" className=' w-full h-full rounded-lg' />
        <button  onClick={() => setBannerModal(true) } className="absolute z-50 bg-blue-700 p-3 px-8 font-serif bg-opacity-80 hover:bg-blue-700  text-white rounded-full right-30">update</button>
        
      </div>
      <div className='relative w-[70vw] h-[50vh] mb-12 flex justify-center items-center'>
  <div className='w-1/2 h-1/2 bg-blue-500 flex flex-col justify-center items-center shadow-2xl shadow-black rounded-lg'>
    <p className="text-white text-xl font-bold mb-4">Contact Details</p>
    <div className="flex flex-col gap-4">
      
        <div  className="flex  gap-2 justify-between items-center">
          <p className="text-white font-semibold">Conatct No.: {data.hotel?.contacts[0]} </p>
          
        </div>
        <div  className="flex  gap-2 justify-between items-center">
          <p className="text-white font-semibold">Email: {data.hotel?.contacts[1]}</p>
        
        </div>
      
    </div>
    <button onClick={() => setContactModal(true) } className="bg-blue-600 border border-solid border-white hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 shadow-md shadow-white">
      Update
    </button>
  </div>
</div>



      {openHeroModal && <HeroModal setHeroModal={setHeroModal} />}
      {openBannerModal && <BannerModal setBannerModal={setBannerModal} />}
      {openAboutModal && <AboutModal setAboutModal={setAboutModal} />}
      {openCollageModal && <CollageModal setCollageModal={setCollageModal} />}
      {openContactModal && <ContactModal setContactModal={setContactModal} />}
      



    </div>
  );
};

export default Home;
