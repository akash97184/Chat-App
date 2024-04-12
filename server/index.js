const express = require('express');
const app = express();
const PORT = 4000;

const http = require('http').createServer(app);
const cors = require('cors');

const socketIO = require('socket.io')(http, {
  cors: {
      origin: ["https://chat-app923.netlify.app"]
  }
});


app.use(cors());


let users = [];

//Add this before the app.get() block
socketIO.on('connection', (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);

  
  socket.on('message', (data) => {
    socketIO.emit('messageResponse', data);
  });

  //Listens when a new user joins the server
  socket.on('newUser', (data) => {
    //Adds the new user to the list of users
    users.push(data);
    console.log(`👤 ${data.userName} joined the chat.`);
    //Sends the list of users to the client
    socketIO.emit('newUserResponse', users);
  });

  socket.on('disconnect', () => {
    console.log(`🔥: ${socket.id}  user disconnected`);
    //Updates the list of users when a user disconnects from the server
    users = users.filter((user) => user.socketID !== socket.id);

    //Sends the list of users to the client
    socketIO.emit('newUserResponse', users);

  });
});



app.get('/api', (req, res) => {
  res.json({
    message: 'Hello world',
  });
  // res.send("<h1>Hello, I am server.</h1>")
});

http.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

