import React from 'react'
import {useNavigate} from "react-router-dom"
import { GiHamburgerMenu } from "react-icons/gi";

const ChatBody = ({messages, setIsOpen}) => { 
  const navigate = useNavigate()

  
  console.log(messages);

  const handleLeaveChat = () => {
    localStorage.removeItem("username")
    navigate("/")
    window.location.reload()
  }

  const handleSidebar = () => {
    setIsOpen(true);
  }

  return (
    <>
      <header className=' w-full h-auto bg-zinc-900 bg-opacity-85 flex justify-between items-center rounded-lg p-3 '>
        <div
          onClick={handleSidebar} 
          className='text-white cursor-pointer md:hidden '>
          <GiHamburgerMenu  />
        </div>
        <p className=' text-white text-sm md:text-2xl  my-2'>Hangout with Peoples</p>
        <button className='leaveChat__btn text-sm h-auto text-nowrap text-white bg-emerald-600 p-2 rounded-lg' onClick={handleLeaveChat}>LEAVE CHAT</button>
      </header>


      <div className=' w-full h-[80%] overflow-y-scroll p-4'>
        {messages.map(message => (
          message.username === localStorage.getItem("username") ? (
            <div className=' w-full h-auto flex justify-end'>
              <div className="message__chats bg-teal-500  p-4 relative rounded-md mb-2 " key={message.id}>
                <p className='sender__name absolute text-xs text-black font-semibold top-0 left-2 '>You</p>
                <div className='message__sender'>
                    <p className=' text-white text-sm'>{message.text}</p>
                </div>
              </div>
            </div>
          ): (
            <div className="message__chats  bg-teal-500 w-fit p-4 relative rounded-md mb-2 " key={message.id}>
              <p className='absolute text-xs text-black font-semibold  top-0 left-2 '>{message.username}</p>
              <div className='message__recipient'>
                <p className='text-white text-sm'>{message.text}</p>
              </div>
            </div>
          )
          ))}
      </div>
    </>
  )
}

export default ChatBody