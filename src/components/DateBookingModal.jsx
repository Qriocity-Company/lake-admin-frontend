import { X } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import '../styles/toggleButton.css'

const DateBookingModal = ({dates,setOpenModal}) => {

  const userId = JSON.parse(localStorage.getItem('user'))?._id
  const [booked,setBooked] = useState(false);
  const host = 'https://lake-paradise-admin.onrender.com'

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
    <div class='fixed top-0 left-0 h-screen w-screen z-50 bg-[rgba(0,0,0,0.7)] flex items-center justify-center'>
    <div class='w-[90%] max-w-md relative flex flex-col p-4 z-100 md:p-6 rounded-xl bg-white shadow-lg'>
        <X class='h-6 w-6 absolute top-4 right-4 cursor-pointer' onClick={()=>setOpenModal(false)}/>
        <h3 class='text-lg md:text-xl font-bold mb-2 md:mb-4'>Update Bookings for these dates:</h3>
        <div class=' w-[90vw] md:w-[70vw] my-2 flex flex-wrap gap-4 max-h-[50vh] overflow-y-scroll pr-2 md:pr-4'>
            {
                dates?.map((date,index)=>(
                    <div key={index} class='shadow-lg bg-blue-400 text-white px-3 py-2 text-sm md:text-lg'>
                        {formatDate(date)}
                    </div>
                ))
            }
        </div>
        <div class='my-2 flex gap-3 items-center'>
            <span class='text-sm md:text-lg font-semibold'>Not Booked</span>
            <label class="switch">
                <input type="checkbox" value={booked} onClick={toggleBooked}/>
                <span class="slider"></span>
            </label>
            <span class='text-sm md:text-lg font-semibold'>Booked</span>
        </div>
        <button class='px-4 py-2 md:px-6 md:py-2 bg-blue-500 rounded-xl hover:bg-blue-600 text-white text-sm md:text-lg' onClick={handleUpdate}>Update</button>
    </div>
</div>

  )
}

export default DateBookingModal