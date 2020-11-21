const chatForm=document.getElementById('chat-form');
const chatMessages=document.querySelector('.chat-messages');
const socket=io();

const {username, room}=Qs.parse(location.search,{
    ignoreQueryPrefix: true
});

console.log(username,room)


socket.on('message',message=>{
    console.log(message);
    outputMessage(message);
    chatMessages.scrollTop=chatMessages.scrollHeight;

});

chatForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    const msg=e.target.elements.msg.value;
    //console.log(msg);
    socket.emit('info',username);
    socket.emit('newMessage',msg);
    
    e.target.elements.msg.value='';
});


function outputMessage(message){
    var div =document.createElement('div');  
    div.setAttribute('class','message');
    div.innerHTML= '<p class="meta">'+message.name +'<span>9:12pm</span></p> <p class="text">' + message.text + '</p>';
    document.querySelector('.chat-messages').appendChild(div);
    
}
