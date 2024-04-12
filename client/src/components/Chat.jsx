import React, { useEffect, useState } from 'react'
import ChatBar from './ChatBar';
import ChatBody from './ChatBody';
import ChatFooter from './ChatFooter';



const Chat = ({socket}) => {


  const [messages, setMessages ] = useState([]);

  const [ isOpen, setIsOpen ] = useState(false);


  useEffect(() => {
    socket.on('messageResponse', (data) => setMessages([...messages, data]));
  }, [socket, messages]);


  return (
    <div className=' chat-section relative w-full h-screen bg-opacity-80 flex gap-2  '>
      <ChatBar
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        socket={socket}
      />
      <div className={` h-full  flex flex-col justify-between xl:w-[75%] w-full absolute xl:static`}>
          <ChatBody 
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            messages={messages}
          />
          <ChatFooter 
            socket={socket}
          />
      </div>
    </div>
  )
}

export default Chat;