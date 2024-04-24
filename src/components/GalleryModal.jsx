import { X } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import axios from 'axios'
const GalleryModal = ({setGalleryModal}) => {
    const host = 'https://lake-paradise-admin.onrender.com'
  const userId = JSON.parse(localStorage.getItem('user'))?._id
  
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  

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
  
      const response = await fetch(`${host}/hotel/add-hotel-images`, {
        method: "POST",
        body: JSON.stringify({
          imagesData: [{ img: fileUrl, title: title }],
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
    <div className='fixed top-0 left-0 h-screen w-screen z-50 bg-black bg-opacity-70 flex items-center justify-center'>
    <div className='w-11/12 md:w-[43vw] relative flex flex-col p-6 md:p-10 justify-center items-center rounded-xl bg-white shadow-lg'>
      <X className='h-6 w-6 absolute top-4 right-4 cursor-pointer' onClick={()=>setGalleryModal(false)}/>
      <h3 className='text-lg md:text-xl font-bold mb-4'>Update Gallery Image:</h3>
      <img 
        src={file ? URL.createObjectURL(file) : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"}
        className="mt-4 mb-2 rounded-lg w-full md:w-[50%] h-auto" 
        alt="Preview"
      />
      <input 
        type="file"  
        onChange={handleImage} 
        className="mt-2 mb-2 px-4 py-2 w-full border border-gray-300 rounded-lg" 
      />
        <input 
        type="text"  
        onChange={(e)=>setTitle(e.target.value)} 
        className="mt-2 mb-2 px-4 py-2 w-full border border-gray-300 rounded-lg" 
        placeholder='Enter Title'
      />
      <button 
        className='px-6 py-2 bg-blue-500 rounded-xl hover:bg-blue-600 text-white mb-2 text-lg md:text-xl'
        onClick={handleSubmit}
      >
        Upload
      </button>
    </div>
  </div>
  )
}

export default GalleryModal