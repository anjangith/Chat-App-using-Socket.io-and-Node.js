const express= require('express')
const app = express()
var path= require('path')
server=app.listen(3000)
var path = require('path')
const io = require("socket.io")(server)
app.set('view engine','ejs')
app.use(express.static('public'))


app.get('/',(req, res)=>{
res.render('index')
})

app.get('/room',(req, res)=>{
res.render('room')
})

app.get('/css/style.css',(req, res)=>{
  res.sendFile(__dirname + 'style.css')
})

app.use((req, res, next) => {
  res.header("Vary", "X-Requested-With");
  next();
});

io.on('connection', (socket)=> {
  console.log(socket.id)
  socket.username = "Anonymous"
  socket.roomnname = "Anonymous"

  socket.on('change_username',(data) => {
    socket.username = data.username
    socket.emit('name_change',{name: data.username})
  })

  socket.on('group_msg',(data)=>{
    io.in(socket.roomname).emit('new_grp_msg',{message : data.message, username: socket.username});
  })



  socket.on('new_message', (data)=>{
    io.sockets.emit('room_msg', {message : data.message, username: socket.username})
  })

  socket.on('create', function(room) {
   socket.roomname = room
   socket.join(room)
   socket.emit('room_joined',{room:socket.roomname})
 });
})
