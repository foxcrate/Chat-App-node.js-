const path=require('path');
const express=require('express');
const http=require('http');
const socketio=require('socket.io');
const formatMesssage=require('./public/js/utils/messages');
const admin='Admin';

const app=express();
const server=http.createServer(app);
const io=socketio(server);



app.use(express.static(path.join(__dirname,'public')));
var port=3000 || process.env.PORT;

server.listen(port,()=>{console.log('Server Running')});
var myUsername='';
io.on('connection',socket=>{
    //console.log('New User Connected');
    socket.emit('message',formatMesssage(admin,'Welcome to Chat ..'));

    socket.broadcast.emit('message',formatMesssage(admin,'New User Joined The Chat ..'));

    socket.on('disconnect', ()=>{
        io.emit('message',formatMesssage('USER','A User Has Left ..'));
    });
    socket.on('info',(username)=>{
        myUsername=username;
    });
    socket.on('newMessage',(msg)=>{
        console.log('From Server: '+msg);
        io.emit('message',formatMesssage(myUsername,msg));
    });
    
});