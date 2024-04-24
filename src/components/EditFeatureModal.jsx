import { PlusCircle, Trash, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EditFeatureModal = ({ feature, setOpenModal }) => {

  const navigate = useNavigate();
  const userId = JSON.parse(localStorage.getItem('user'))?._id;
  const hotelId = "66221c2cce3f47d7d06cd26a";
  //   const host = 'https://lake-paradise-admin.onrender.com';
  const host = 'http://localhost:3001';

  const [title, setTitle] = useState('');
  const [contentInputs, setContentInputs] = useState([]);

  useEffect(() => {
    setTitle(feature.title);
    setContentInputs(feature.content.map((str, index) => ({ id: index, value: str })));
  }, [feature]);

  const handleContentInputChange = (id, value) => {
    setContentInputs(prevInputs => prevInputs.map(input => input.id === id ? { ...input, value } : input));
  };

  const handleAddContentInput = () => {
    setContentInputs(prevInputs => [...prevInputs, { id: prevInputs.length, value: '' }]);
  };

  const handleDeleteContentInput = (id) => {
    setContentInputs(prevInputs => prevInputs.filter(input => input.id !== id));
  };

  const handleUpdate = async () => {
    try {
      const updatedContent = contentInputs.map(input => input.value);
      const res = await axios.post(`${host}/hotel/update-features-content`, {
        userId,
        hotelId,
        title,
        content: updatedContent
      });
      console.log(res.data);
      window.location.reload()
      setOpenModal(false);
    } catch (error) {
      console.error('Error updating feature content:', error);
    }
  };

  return (
    <div className='fixed top-0 left-0 h-screen w-screen z-50 bg-[rgba(0,0,0,0.7)] flex items-center justify-center'>
      <div className='w-[90%] max-w-md relative flex flex-col p-4 z-100 md:p-6 rounded-xl bg-white shadow-lg'>
        <X className='h-6 w-6 absolute top-4 right-4 cursor-pointer' onClick={() => setOpenModal(false)} />
        <h3 className='text-lg md:text-xl font-bold mb-2 md:mb-4'>Update This Feature : {feature.title}</h3>
        <div className='my-2 flex flex-col gap-4 max-h-[60vh] overflow-y-auto'>
          
          {contentInputs.map((input, index) => (
            <div key={input.id} className='w-full flex items-center gap-2'>
              <input
                type="text"
                value={input.value}
                onChange={(e) => handleContentInputChange(input.id, e.target.value)}
                className='p-2 border-zinc-500 border rounded-xl w-[90%]'
              />
              <button onClick={() => handleDeleteContentInput(input.id)}>
                <Trash className='text-red-500 cursor-pointer'/>
              </button>
            </div>
          ))}

        </div>
        <button onClick={handleAddContentInput} className='py-2 w-full rounded-xl border border-blue-500 text-blue-500 flex items-center gap-3 justify-center mt-2'>Add Content <PlusCircle/> </button>

        <button className='px-4 py-2 mt-3 md:px-6 md:py-2 bg-blue-500 rounded-xl hover:bg-blue-600 text-white text-sm md:text-lg' onClick={handleUpdate}>Update</button>
      </div>
    </div>
  );
};

export default EditFeatureModal;
