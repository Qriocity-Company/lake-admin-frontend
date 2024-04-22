import React, { useEffect, useState } from 'react';

import { Calendar, MessageCircle, Phone, Trash, User } from 'lucide-react';

const Messages = () => {
  const host ='https://lake-paradise-admin.onrender.com';
  const [messages, setMessages] = useState([]);

  const fetchMessages = async () => {
    try {
      const res = await fetch(`${host}/messages/get-all-messages`);
      const data = await res.json();
      console.log(data);
      setMessages(data.messages);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const deleteMessage=async(id)=>{
    const res = await fetch(`${host}/messages/delete-message/${id}`,{
      method:"DELETE",
    });
    const data = await res.json();

    console.log(data);
    if(res.ok){
      alert('Message Deleted Successfully');
    }
    window.location.reload();
  }

  return (
    <div className='h-full w-full flex flex-col items-center pb-8'>
      <div className='md:w-[90%] w-[95%] flex flex-col'>
        <h2 className='mt-8 mb-6 font-bold text-2xl'>Check Out User Messages</h2>

        <div className='max-h-[80vh] overflow-y-auto pr-6'>
          {messages?.map((message, index) => (
            <div key={index} className='bg-blue-100 p-4 my-4 rounded-md shadow flex flex-col gap-2'>
              <div className='flex items-center justify-between mb-2'>
                <h3 className='text-xl font-semibold'>Message {index + 1}</h3>
                <Trash className=' cursor-pointer text-red-500 text-lg' onClick={()=>deleteMessage(message._id)} />
              </div>
              <div className='flex flex-col gap-1 '>
                <h3 className='text-lg font-bold'>Checkin - Checkout</h3>
                <div className='flex items-center md:gap-8 md:justify-start justify-between'>
                  <div className='flex items-center gap-2'>
                    <Calendar className='text-gray-500' />
                    <span>{new Date(message.checkinDate).toLocaleDateString()}</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <Calendar className='text-gray-500' />
                    <span>{new Date(message.checkoutDate).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className='mt-3 flex items-center gap-2'>
                  <Phone className='text-gray-500' />
                  <span>{message.phoneNumber}</span>
                </div>
                
                <div className='mt-3 flex items-center gap-2'>
                  <User className='text-gray-500' />
                  <span>{message.adults} Adults, {message.children} Children</span>
                </div>
              </div>
              <div className='mt-3 p-3 rounded-xl bg-blue-200  text-wrap'>
                <MessageCircle/>
                <p className='text-gray-700 mt-1'>{message.message}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Messages;
