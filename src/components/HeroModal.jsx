import { X } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import axios from 'axios'
const HeroModal = ({setHeroModal}) => {
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
  
      const response = await fetch(`${host}/hotel/update-hero-image`, {
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
    <div class='fixed top-0 left-0 h-screen w-screen z-50 bg-[rgba(0,0,0,0.7)] flex items-center justify-center'>
    <div class='w-[90%] max-w-md relative flex flex-col p-4 md:p-6 justify-center items-center rounded-xl bg-white shadow-lg'>
        <X class='h-6 w-6 absolute top-4 right-4 cursor-pointer' onClick={()=>setHeroModal(false)}/>
        <h3 class='text-lg md:text-xl font-bold mb-2 md:mb-4'>Update Hero Image:</h3>
        <img src={
            file
            ? URL.createObjectURL(file)
            : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
        }
        class="mt-4 mb-2 rounded-lg"
        style={{ width: '80%', maxWidth: '300px', height: 'auto' }}/>
        <input type="file" onChange={handleImage} class="mt-2 mb-2 px-4 py-2 w-full md:w-auto border border-gray-300 rounded-lg"/>
        <button class='px-4 py-2 md:px-6 bg-blue-500 rounded-xl hover:bg-blue-600 text-white text-sm md:text-lg' onClick={handleSubmit}>Update</button>
    </div>
</div>

  )
}

export default HeroModal