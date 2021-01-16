

const socket = io();

//extracting DOM elements
const $form = document.getElementById('form');
const $input = document.getElementById('input');
const $messageList = document.getElementById('messages');




// adding event listener when the form gets submit
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