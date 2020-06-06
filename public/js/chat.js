const socket = io();
const event = socket.on('countUpdated', (count) => {
    console.log(`Count updated to ${count}`);    
});

document.getElementById('increment').addEventListener('click', (e) => {    
    socket.emit('updatedIncrement');    
});