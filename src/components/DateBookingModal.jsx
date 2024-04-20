import { X } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import '../styles/toggleButton.css'

const DateBookingModal = ({dates,setOpenModal}) => {

  const userId = JSON.parse(localStorage.getItem('user'))?._id
  const [booked,setBooked] = useState(false);
  const host = 'http://localhost:3001'

  useEffect(()=>{
    console.log(dates);
  },[])

  const handleUpdate=async()=>{
    console.log(booked);
    try {
        const response = await fetch(`${host}/date/book-date`,{
            method:"POST",
            body:JSON.stringify({
                dates:dates,
                booked,
                userId
            }),
            headers:{
                'Content-Type':'application/json'
            }
        });
        const data = await response.json();
        console.log(data);
        if(data.success){
            alert(data.message);
        }
        else{
            alert("There was some error , Try again later.")
        }
    } catch (error) {
        console.error(error);
    }
  }
  const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const toggleBooked=(e)=>{
    console.log(e.target.checked);
    setBooked(e.target.checked);
  }
  return (
    <div className='fixed top-0 left-0 h-[100vh] w-[100vw] z-50 bg-[rgba(0,0,0,0.7)] flex items-center justify-center'>
        <div className='w-[43vw] relative flex flex-col p-6 rounded-xl bg-white shadow-lg'>
            <X className='h-6 w-6 absolute top-4 right-4 cursor-pointer' onClick={()=>setOpenModal(false)}/>
            <h3 className='text-xl font-bold mb-4'>Update Bookings for these dates : </h3>
            <div className='my-2 flex gap-2 flex-wrap max-h-[60vh] oveflow-y-scroll pr-4'>
            {
                dates?.map((date,index)=>(
                    <div key={index} className='shadow-lg bg-blue-400 text-white px-5 py-3 text-lg'>
                        {formatDate(date)}
                    </div>
                ))
            }
            </div>
            <div className='my-4 flex gap-6 items-center'>
                <span className='text-lg font-semibold'>Not Booked</span>
                <label class="switch">
                    <input type="checkbox" value={booked} onClick={toggleBooked}/>
                    <span class="slider"></span>
                </label>
                <span className='text-lg font-semibold'>Booked</span>
            </div>
            <button className='px-6 py-2 bg-blue-500 rounded-xl hover:bg-blue-600 text-white text-xl' onClick={handleUpdate}>Update</button>
        </div>
    </div>
  )
}

export default DateBookingModal