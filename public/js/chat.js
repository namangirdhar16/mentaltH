// client side javascript
const socket = io();

// socket.on('connect',() => {
//     console.log(socket.id);
// })


//extracting DOM elements
const $form = document.getElementById('form');
const $input = document.getElementById('input');
const $messageList = document.getElementById('messages');


// using queryString to get the room in form of its key and value pair
const { username , room } = Qs.parse(location.search , {ignoreQueryPrefix:true});

console.log(username , room);

//  when the form gets submit
$form.addEventListener('submit',(e)=>{ 

    e.preventDefault();
    if($input.value)
    {
        socket.emit('message' , $input.value);
        input.value = '';
    }
});

socket.on('message',(message)=>{
    console.log(message);
    
    const listElement = document.createElement('li');
    const textContent = document.createTextNode(message);
    listElement.appendChild(textContent);
    
    $messageList.appendChild(listElement);
}) 


socket.emit('join', {username , room} ,(err)=>{
    if(err)
    return console.log('room name was not sent!',room)
    console.log('room name was sent! - from callback',room);
})