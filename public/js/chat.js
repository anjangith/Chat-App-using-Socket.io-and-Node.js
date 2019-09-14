$(function(){
  var socket = io.connect('http://localhost:3000')
  var usertext = $("#usr")
  var nameBtn= $("#myBtn")
  var userName=$("#username")
  var message= $("#messages")
  var sendBtn= $("#sendBtn")
  var msg=$("#msgTxt")
  var roomBtn=$("#room")
  var roomBack=$("#roomback")
  var roomname=$('#roomnamefield')
  var roomJoin=$('#roomjoin')
  var roomtext = $('#roomtext')
  var sendGrp=$('#btnsnd')
  var grpMessages= $('#groupmessages')

nameBtn.click(function(){
  socket.emit('change_username',{username: usertext.val()})

})

roomJoin.click(function(){
  socket.emit('create', roomname.val())
})

socket.on("name_change",(data)=>{
    userName.text("Hi "+data.name)
})

socket.on("room_joined",(data)=>{
  roomtext.text("Room joined:"+data.room)
})

socket.on("new_grp_msg",(data)=>{
  console.log("Data came in")
  grpMessages.append("<div class='alert alert-success col-md-3'><p>"+data.username+"</div>"+"<div class='alert alert-info col-md-9'><p class='ml-5'>"+data.message+"</p></div>")
})

socket.on("room_msg",(data)=>{
  message.append("<div class='alert alert-success col-md-3'><p>"+data.username+"</div>"+"<div class='alert alert-info col-md-9'><p class='ml-5'>"+data.message+"</p></div>")
})

sendBtn.click(function(){
  socket.emit('new_message',{message:msg.val(),username:socket.username})
})

roomBtn.click(function(){
  location.replace("/room");

})

roomBack.click(function(){
  location.replace("/")
})

sendGrp.click(function(){
console.log("Clicked")
socket.emit('group_msg', {message:msg.val(),username:socket.username });
})


});
