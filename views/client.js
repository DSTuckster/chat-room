var socket = io();
    
var chatRoom = document.getElementById("chatRoom");
var messages = document.getElementById('messages');
var form = document.getElementById('form');
var input = document.getElementById('input');

var usernameForm = document.getElementById('usernameForm');
var usernameInput = document.getElementById('username');
var username = '';

form.addEventListener('submit', function(e) {
  e.preventDefault();
  if (input.value) {
    var msg = input.value;

    //emit message and username to server
    socket.emit('chat message', msg, username);

    //empty input field
    input.value = '';
  }
});

socket.on('chat message', function(msg) {
  //create html list element that will hold the message from user
  var item = document.createElement('li');

  //get message from element
  item.textContent = msg;

  //append list element to html list
  messages.appendChild(item);

  window.scrollTo(0, document.body.scrollHeight);
});

function hideLogin(){
  //get username from input value
  if(usernameInput.value){
    username = usernameInput.value;
  }

  //hide login element
  var loginbox = document.getElementById("loginbox");
  loginbox.style.display = "none";
  chatRoom.style.display = "block";
}