// Get the current username from the cookies
var username = cookie.get('user');
if (!username) {
  username = prompt('Enter username:');
  if (!username) {
    alert('Invalid Username');
  } else {
    cookie.set('user', username);
  }
}

var socket = io();

socket.on('count', function (data) {
  $('.user-count').html(data);
});

socket.on('message', function (data) {
  $('.chat').append('<p><strong>' + data.user + '</strong>: ' + data.message + '</p>');
});

$('form').submit(function (e) {
  e.preventDefault();
  var message = $(e.target).find('input').val();
  socket.emit('message', {
    user: cookie.get('user') ||'Anonymous',
    message: message
  });

  e.target.reset();
  $(e.target).find('input').focus();
});
