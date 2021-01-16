const express = require('express');

const app = express();

const http = require('http');

const server = http.createServer(app);

const io = require('socket.io')(server);
const { addUser , removeUser } = require('./utils/users.js');

app.use(express.static(__dirname + '/public'));


io.on('connection',(socket)=>{
    console.log('a new user is connnected with id ', socket.id);

    socket.broadcast.emit('message','a new user has joined - from the server!!');
    // socket.emit('message','Welcome - Admin');

    socket.on('join',({ username , room },callback)=>{
        socket.join(room);
        
        socket.emit('message','Welcome! - Admin');
        socket.to(room).broadcast.emit('message',`${username} has joined! the room ${room}`);
        callback();
    })
    
    socket.on('disconnect',()=>{
        
        
        console.log('user has disconnected!');
        socket.broadcast.emit('message','a user has disconnected!');
        
    })

    socket.on('message', (message) => {
        console.log('message is ',message);
        io.emit('message',message);
    })
})



app.get('/',(req,res)=>{
   res.sendFile(__dirname + '/public/index.html');
})









server.listen(3000,()=>{
    console.log('server is up and running on port 3000')
})



