import { X } from 'lucide-react';
import React, { useEffect, useState } from 'react'

const UpdatePriceModal = ({dates,setOpenModal}) => {

  const userId = JSON.parse(localStorage.getItem('user'))?._id
  const [price,setPrice] = useState('');
  const host = 'http://localhost:3001'

  useEffect(()=>{
    console.log(dates);
  },[])

  const handleUpdate=async()=>{
    try {
        const response = await fetch(`${host}/date/update-dates`,{
            method:"POST",
            body:JSON.stringify({
                dates:dates,
                price,
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

  return (
    <div className='fixed top-0 left-0 h-[100vh] w-[100vw] z-50 bg-[rgba(0,0,0,0.7)] flex items-center justify-center'>
        <div className='w-[43vw] relative flex flex-col p-6 rounded-xl bg-white shadow-lg'>
            <X className='h-6 w-6 absolute top-4 right-4 cursor-pointer' onClick={()=>setOpenModal(false)}/>
            <h3 className='text-xl font-bold mb-4'>Update Price for these dates : </h3>
            <div className='my-2 flex gap-2 flex-wrap max-h-[60vh] oveflow-y-scroll pr-4'>
            {
                dates?.map((date,index)=>(
                    <div key={index} className='shadow-lg bg-blue-400 text-white px-5 py-3 text-lg'>
                        {formatDate(date)}
                    </div>
                ))
            }
            </div>
            <input onChange={(e)=>setPrice(e.target.value)} type="text"  className='border-2 border-zinc-400 px-4 py-2 outline-none focus:outline-blue-400 my-3 font-semibold' placeholder='Enter Price'/>
            <button className='px-6 py-2 bg-blue-500 rounded-xl hover:bg-blue-600 text-white text-xl' onClick={handleUpdate}>Update</button>
        </div>
    </div>
  )
}

export default UpdatePriceModal