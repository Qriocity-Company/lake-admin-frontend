import { X } from 'lucide-react';
import React, { useEffect, useState } from 'react'

const UpdatePriceModal = ({dates,setOpenModal}) => {

  const userId = JSON.parse(localStorage.getItem('user'))?._id
  const [price,setPrice] = useState('');
  const host = 'https://lake-paradise-admin.onrender.com'

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
    <div class='fixed top-0 left-0 h-screen w-screen z-50 bg-[rgba(0,0,0,0.7)] flex items-center justify-center'>
    <div class='w-[90vw] md:w-[45vw] z-100 relative flex flex-col p-4 md:p-6 rounded-xl bg-white shadow-lg'>
        <X class='h-6 w-6 absolute top-4 right-4 cursor-pointer' onClick={()=>setOpenModal(false)}/>
        <h3 class='text-lg md:text-xl font-bold mb-2 md:mb-4'>Update Price for these dates:</h3>
        <div class='my-2 flex flex-wrap gap-4 max-h-[50vh] overflow-y-scroll pr-2 md:pr-4'>
            {
                dates?.map((date,index)=>(
                    <div key={index} class='shadow-lg bg-blue-400 text-white px-3 py-2 text-sm md:text-lg'>
                        {formatDate(date)}
                    </div>
                ))
            }
        </div>
        <input onChange={(e)=>setPrice(e.target.value)} type="text" class='border-2 border-zinc-400 px-4 py-2 outline-none focus:outline-blue-400 my-3 text-sm md:text-base font-semibold' placeholder='Enter Price'/>
        <button class='px-4 py-2 md:px-6 bg-blue-500 rounded-xl hover:bg-blue-600 text-white text-sm md:text-lg' onClick={handleUpdate}>Update</button>
    </div>
</div>

  )
}

export default UpdatePriceModal