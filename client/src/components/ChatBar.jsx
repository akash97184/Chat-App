import React, { useEffect, useState } from 'react';

import { IoClose } from "react-icons/io5";

const ChatBar = ({socket, isOpen, setIsOpen}) => {

  const [ users, setUsers ] = useState([]);

  useEffect( () => {
    socket.on('newUserResponse', (data) => {
      setUsers(data);
    })
  }, [socket, users]);

  console.log(users);

  const handleSidebarClose = () => {
    setIsOpen(false);
  }


  return (
    <div className={isOpen ? 'sidebarOpen' : 'sidebar'}>
      <div className='flex justify-between items-baseline'>
        <h2 className={`text-green-200 font-semibold text-center mb-3 text-3xl `}>Open Chat</h2>
        <div
          onClick={handleSidebarClose} 
          className='text-white text-2xl md:hidden '>
          <IoClose />
        </div>
      </div>
      <div className='  p-1'>
        <h4 className="  font-semibold text-[1.2rem] text-slate-100 ">Active Users</h4>
        <div className="flex flex-col justify-start gap-1 ">
          {users.map((user) => 
            <p className=' text-zinc-200 p-2 z-20 ' key={user.socketID}>{user.userName}</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default ChatBar; 