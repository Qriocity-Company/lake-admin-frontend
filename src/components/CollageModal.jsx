import { X } from 'lucide-react';
import React, { useState } from 'react';
import axios from 'axios';

const CollageModal = ({ setCollageModal }) => {
  const host = 'https://lake-paradise-admin.onrender.com';
  const userId = JSON.parse(localStorage.getItem('user'))?._id;

  const [files, setFiles] = useState([]);
  const [titles, setTitles] = useState([]);

  const handleImage = (e) => {
    setFiles([...e.target.files]);
  };

  const handleTitleChange = (index, title) => {
    const newTitles = [...titles];
    newTitles[index] = title;
    setTitles(newTitles);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const list = await Promise.all(
            Object.values(files).map(async (file) => {
              const data = new FormData();
              data.append("file", file);
              data.append("upload_preset", "upload");
              const uploadRes = await axios.post(
                "https://api.cloudinary.com/v1_1/dh6zjine0/image/upload",
                data
              );
    
              const { url } = uploadRes.data;
              return url;
            })
          );

      const uploadedImages = list.map((url, index) => ({
        img: url,
        title: titles[index]
      }));

      const response = await axios.post(`${host}/hotel/update-hotel-images`, {
        imagesData: uploadedImages,
        userId: userId,
        hotelId: "66221c2cce3f47d7d06cd26a"
      });

      const data = response.data;
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
    <div className='fixed top-0 left-0 h-screen w-screen z-50 bg-[rgba(0,0,0,0.7)] flex items-center justify-center'>
      <div className=' md:w-[43vw] w-[90vw] max-h-[90vh] relative flex flex-col  justify-center items-center  rounded-xl bg-white shadow-lg'>
      <X className='h-6 w-6 absolute top-4 right-4 cursor-pointer' onClick={() => setCollageModal(false)} />
      <h3 className='text-xl font-bold my-4 '>Update Your Gallery : </h3>
      <div className='max-h-[70vh] w-[90%] overflow-y-scroll pr-4 my-4'>
      {files.map((file, index) => (
        <div key={index} class="flex flex-col items-center justify-center ">
          <img
            src={URL.createObjectURL(file)}
            className="mt-4 mb-2 rounded-lg w-full "
            alt="Uploaded Image"
          />
          <input
            type="text"
            placeholder="Enter Title"
            value={titles[index] || ""}
            onChange={(e) => handleTitleChange(index, e.target.value)}
            className="mt-2 mb-1 px-4 py-2 w-full border border-gray-300 rounded-lg"
          />
        </div>
      ))}
      </div>
      <div>
        <input type="file" multiple onChange={handleImage} className="mt-2 mb-2 px-4 py-2 w-full border border-gray-300 rounded-lg" />
      </div>
      <button className='px-6 py-2 bg-blue-500 rounded-xl hover:bg-blue-600 text-white mb-2 text-xl' onClick={handleSubmit}>Update</button>
    </div>
  </div>
  
  );
};

export default CollageModal;
