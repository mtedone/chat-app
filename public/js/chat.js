const socket = io();

const event = socket.on('message', (message) => {
    console.log(message);    
});

document.getElementById('messageForm').addEventListener('submit', e => {
    e.preventDefault();
    const text = document.getElementById('message').value;
    socket.emit('sendMessage', text, (error) => {
        if (error) {
            return console.log(error);            
        }      
        console.log('Message delivered');        
    });
});

document.querySelector('#locationBtn').addEventListener('click', e => {
    // Old browsers might not support it
    if(!navigator.geolocation) {
        return alert('Geolocation is not supported by your browser');
    }

    navigator.geolocation.getCurrentPosition( (position) => {
        socket.emit('sendLocation', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        }, () => {
            console.log('Server acknowledged the location');            
        });         
    });
});