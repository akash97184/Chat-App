import React, { useState } from 'react'

const ChatFooter = ({socket}) => {

  const [message, setMessage] = useState('');

  const handleSendMessage = (e) => {
    e.preventDefault();
    // console.log({username: localStorage.getItem('username'), message });

    if( message.trim() && localStorage.getItem('username')) {
      socket.emit('message', {
        text: message,
        username: localStorage.getItem('username'),
        id: `${socket.id}${Math.random()}`,
        socketId: socket.id,
        sendAt: new Date(),
      })
    }

    setMessage('');
  }

  return (
    <div className="chat__footer ">
      <form className="form flex justify-between items-center p-2" onSubmit={handleSendMessage}>
        <input
          type="text"
          placeholder="Write message"
          className="message w-[70%] md:[80%] h-[2rem] md:h-[3rem]  bg-zinc-600 bg-opacity-80 text-white rounded-lg outline-none  my-3 p-3"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className="sendBtn h-[2rem] md:h-[3rem] text-sm md:text-xl text-white bg-emerald-600 p-2 rounded-lg">SEND</button>
      </form>
    </div>
  )
}

export default ChatFooter;