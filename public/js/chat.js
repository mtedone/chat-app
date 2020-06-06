const socket = io();

const event = socket.on('message', (message) => {
    console.log(message);    
});

document.getElementById('messageForm').addEventListener('submit', e => {
    e.preventDefault();
    const text = document.getElementById('message').value;
    socket.emit('sendMessage', text);
})