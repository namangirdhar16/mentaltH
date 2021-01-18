// for storing data temporarily
const users = [];

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


const removeUser = (id) => {
    
     const index = users.findIndex((user) => {
         return user.id ===id;
     })
    
     if(index !== -1)
     return users.splice(index,1)[0];


}
const getUserBySocketId = (id) => {
    
    const index = users.findIndex((user) => {
        return user.id === id;

    })
    
    if(index !== -1)
    return users[index];
    else 
    return {
        error : 'no such user exist',
    }
}

// const user = {
//     username: 'naman',
//     room : 'india',
//     id : '1',

// }



const generateMessage = ({ message , user}) => {
      
      return {
          message, ...user
      }
};

module.exports = {
    addUser , removeUser , getUserBySocketId , generateMessage
}