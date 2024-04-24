import axios from 'axios'
import React, { useEffect, useState } from 'react'
import EditFeatureModal from './EditFeatureModal';

const UpdateFeatures = () => {
  
  const hotelId = "66221c2cce3f47d7d06cd26a";
  
  const userId = JSON.parse(localStorage.getItem('user'))?._id;
//   const host = 'https://lake-paradise-admin.onrender.com';
  const host = 'http://localhost:3001';

  const [features,setFeatures] = useState([]);
  const [selectedFeature,setSelectedFeature] = useState(null);
  const [openModal,setOpenModal] = useState(false);

  const fetchFeatures = async()=>{

    const res = await fetch(`${host}/hotel/get-hotel-features`,{
        body:JSON.stringify({
            userId,hotelId
        }),
        headers:{
            'Content-Type':'application/json'
        },
        method:"POST"
    });
    const data = await res.json();
    console.log(data);
    setFeatures(data.features);
  }

  useEffect(()=>{
    fetchFeatures();
  },[])

  const handleOpenModal=(feature)=>{
    setSelectedFeature(feature);
    setOpenModal(true);
  }

  return (
    <div className='w-full flex flex-col items-center mt-12'>
        {openModal && <EditFeatureModal feature={selectedFeature} setOpenModal={setOpenModal}/>}
        <div className='w-[95%] md:w-[90%] grid grid-cols-1 md:grid-cols-3 md:grid-rows-4 gap-x-24 gap-y-10 md:gap-y-4'>
        {
            features.map((feature,index)=>{
                return(
                    <div onClick={()=>handleOpenModal(feature)} key={index} className={`hover:bg-slate-200 cursor-pointer p-3 ${index==2?' row-span-2':''}`}>
                        <div className='bg-black text-white rounded-xl  px-8 md:px-12 py-2 md:py-4 text-[18px] md:text-[24px] w-fit'>
                            {feature.title}
                        </div>
                        <ul className='pl-8 text-[16px] mt-3 md:mt-6 list-disc flex flex-col gap-2'>
                        {
                            feature.content.map((str,index)=>(
                                <li key={index}>{str}</li>
                            ))
                        }
                        </ul>
                    </div>
                )
            })
        }
        </div>
    </div>
  )
}

export default UpdateFeatures