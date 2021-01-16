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

// const getUsersInRoom = (room) => {
     
    
// }
const user = {
    username: 'naman',
    room : 'india',
    id : '1',

}


addUser(user);
addUser(user);
console.log(users);
console.log(removeUser('1'));
// console.log(users);

module.exports = {
    addUser , removeUser
}