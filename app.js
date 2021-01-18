const express = require('express');

const app = express();

const http = require('http');

const server = http.createServer(app);

const io = require('socket.io')(server);

//const { addUser , removeUser , getUserBySocketId } = require('./utils/users.js');
app.use(express.static(__dirname + '/public'));

const users = [];

io.on('connection',(socket)=>{

    socket.broadcast.emit('message','a new user has joined! - through main broadcast ');
    socket.on('join',({username , room},callback)=>{
        
       
        //console.log({username , room , id});
        socket.join(room);
   
        console.log(username,room);
        addUser({ username , room , id : socket.id});
       
        socket.emit('message','Welcome! - Admin');
        socket.to(room).broadcast.emit('message',`A ${username} has joined! the room ${room} -Admin`);
        callback();
    })
      
   
   
    socket.on('disconnect',()=>{
        console.log('user has disconnected!');
         console.log(users);
         const index = users.findIndex((user)=>{
             return socket.id === user.id;
         })
         
         if(index==-1)
         socket.broadcast.emit('message','a user has disconnected!');
         else
         {   const user = users[index];
             
             users.splice(index,1);
             const {  username } = user;
             socket.to(user.room).broadcast.emit('message',`${username} has disconnected!`);
         }
         console.log(index);
         
         
    })
    socket.on('message',(message)=>{
        
        console.log('message is ',message);
       
        const index = users.findIndex((user)=>{
            return user.id === socket.id;
        })
        console.log(index);
        if(index===-1)
        io.emit('message',message);
        else
        { 
             const user = users[index];
             
             io.to(user.room).emit('message', message);
             
        }
        
    
    })
    socket.on('messageWithName', (message) => {
        console.log('message is ',message);
       
        const index = users.findIndex((user)=>{
            return user.id === socket.id;
        })
        console.log(index);
        if(index===-1)
        io.emit('message',message);
        else
        { 
             const user = users[index];
             
             io.to(user.room).emit('messageWithName',{ message , user});
             
        }
        
    })
})



app.get('/',(req,res)=>{
   res.sendFile(__dirname + '/public/index.html');
})









server.listen(3000,()=>{
    console.log('server is up and running on port 3000')
})



// utils part 
// const printAllUsers = () =>{
//     console.log('from print all users');
//     users.forEach((user)=>
//     console.log(user));
// }

const addUser = ({username , room , id }) => {
    
    //validating users
    if(!username || !room )
    {
        return {
            error: 'username or room is not defined!',
        }
    }
    
    const user = {
        username , room , id
    }
    users.push(user);
    return user;
}


// const removeUser = (id) => {
    
//      const index = users.findIndex((user) => {
//          return user.id ===id;
//      })
    
//      if(index !== -1)
//      return users.splice(index,1);


// }
// const getUserBySocketId = (id) => {
    
//     const index = users.findIndex((user) => {
//         return user.id === id;

//     })
    
//     if(index !== -1)
//     return users[index];
//     else 
//     return {
//         error : 'no such user exist',
//     }
// }




                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       