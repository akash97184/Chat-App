import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const Home = ({socket}) => {

    const navigate = useNavigate();

    const [ userName, setUserName ] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        localStorage.setItem('username', userName);
        socket.emit('newUser', {userName, socketID: socket.id});
        navigate('/chat');
    }


  return (
    <form className=" bg-zinc-800 w-full h-screen flex items-center justify-center" onSubmit={handleSubmit}>
      <div className='w-[50%] h-auto p-5 flex flex-col justify-center items-center'>
        <h2 className="home__header text-white text-xl text-nowrap md:text-2xl mb-4">Sign in to Open Chat</h2>
        <label htmlFor="username" className='text-white text-lg'>Username</label>
        <input
          type="text"
          name="username"
          id="username"
          className="username__input w-[60%] h-[3rem] bg-zinc-600 text-white rounded-lg outline-none  my-3 p-3"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <button className="home__cta  bg-teal-600 text-sm w-auto rounded-lg p-3 mt-3 ">SIGN IN</button>
      </div>
    </form>
  )
}

export default Home;