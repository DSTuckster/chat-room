var socket = io();
    
var messages = document.getElementById('messages');
var form = document.getElementById('form');
var input = document.getElementById('input');

var usernameForm = document.getElementById('usernameForm');
var usernameInput = document.getElementById('username');
var username = '';

usernameForm.addEventListener('login', function(e){
  e.preventDefault();
  if(usernameInput.value){
    console.log(usernameInput.value);
    username = usernameInput.value;
  }
});

form.addEventListener('submit', function(e) {
  e.preventDefault();
  if (input.value) {
    socket.emit('chat message', username + ":" + input.value);
    input.value = '';
  }
});

socket.on('chat message', function(msg) {
  var item = document.createElement('li');
  item.textContent = msg;
  messages.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
});