import React from 'react';
import useFetch from '../hooks/useFetch';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import GalleryModal from '../components/GalleryModal';
import { useState } from 'react';

function Gallery() {
 const [openGalleryModal, setGalleryModal] = useState(false);
 const { data, loading, error } = useFetch(`https://lake-paradise-admin.onrender.com/hotel/get-hotel`);
 const userId = JSON.parse(localStorage.getItem('user'))?._id
 if (loading) return <div>Loading...</div>;
 if (error) return <div>Error: {error.message}</div>;

 const handledelete=async(index)=>{
    
    try {
        // Make a DELETE request to the delete-hotel-image route with the imageId in the URL
        const response = await fetch(`https://lake-paradise-admin.onrender.com/hotel/delete-hotel-image/${index}`, {
          method: "DELETE",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            userId: userId,
            hotelId: "66221c2cce3f47d7d06cd26a" // Assuming you have a hotelId available
          })
        });
    
        const data = await response.json();
        if (data.success) {
          alert(data.message);
          window.location.reload();
          // Optionally, you can update the UI to reflect the deletion
        } else {
          alert("Failed to delete image.");
        }
      } catch (error) {
        console.error("Error deleting image:", error);
        // Handle error
      }

 }

 return (
    <div className='h-full w-full'>
    <div className="flex flex-wrap  justify-between p-12">
      {data.hotel?.hotelImages.map((image, index) => (
        <div key={index} className="w-1/4 p-2 gap-4 mb-4  shadow-md shadow-blue-500 relative">
          <img src={image.img} alt={image.title} className="w-full h-auto" />
          <div className="mt-4 text-center">{image.title}</div>
          <FontAwesomeIcon icon={faTrash} className="absolute top-5 right-5 text-red-500 text-2xl cursor-pointer " onClick={()=>handledelete(index)} />
          
        </div>
      ))}
     
      {openGalleryModal && <GalleryModal setGalleryModal={setGalleryModal} />}
    </div>
    <button onClick={() => setGalleryModal(true) } className=" ml-12 p-4 h-fit bg-blue-600 text-white rounded-md">Upload</button>
    </div>
 );
}

export default Gallery;
