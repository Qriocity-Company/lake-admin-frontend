import { X } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import axios from 'axios'

const AboutModal = ({setAboutModal}) => {
    const host = 'https://lake-paradise-admin.onrender.com'
  const userId = JSON.parse(localStorage.getItem('user'))?._id
  
  const [file, setFile] = useState(null);
  

  
  const handleImage = (e) => {
    setFile(e.target.files[0]);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Upload file to Cloudinary
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "upload");
  
      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/dh6zjine0/image/upload",
        formData
      );
      
      // Get the file URL from Cloudinary response
      const fileUrl = uploadRes.data.url;
      console.log("hi"); // Fixed typo here: 'console.loglog' to 'console.log'
  
      const response = await fetch(`${host}/hotel/update-about-image`, {
        method: "POST",
        body: JSON.stringify({
          imgUrl: fileUrl,
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
      console.error("Error updating image:", error);
      // Handle error
    }
  };
  


  return (
    <div className='fixed top-0 left-0 h-[100vh] w-[100vw] z-50 bg-[rgba(0,0,0,0.7)] flex items-center justify-center'>
        <div className='w-[43vw] relative flex flex-col p-6 justify-center items-center rounded-xl bg-white shadow-lg'>
            <X className='h-6 w-6 absolute top-4 right-4 cursor-pointer' onClick={()=>setAboutModal(false)}/>
            <h3 className='text-xl font-bold mb-4'>Update About Image : </h3>
           
            <img src={
                   file
                   ? URL.createObjectURL(file)
                   : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"}
                   className="mt-4 mb-2 rounded-lg" style={{ width: '50%', height: '30%' }}/> 

        <input type="file"  onChange={handleImage} className="mt-2 mb-2 px-4 py-2 w-full border border-gray-300 rounded-lg" />
            
            <button className='px-6 py-2 bg-blue-500 rounded-xl hover:bg-blue-600 text-white mb-2 text-xl' onClick={handleSubmit}>Update</button>
        </div>
    </div>
  )
}

export default AboutModal