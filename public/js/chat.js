const socket = io();

// Elements
const $messageForm = document.getElementById('messageForm');
const $messageFormInput = document.getElementById('message');
const $messageFormBtn = document.querySelector('#locationBtn');
const $locationBtn = document.querySelector('#locationBtn');

const event = socket.on('message', (message) => {
    console.log(message);    
});

$messageForm.addEventListener('submit', e => {
    e.preventDefault();
    $messageFormBtn.setAttribute('disabled', 'disabled');
    $messageForm.disable;
    const text = $messageFormInput.value;
    socket.emit('sendMessage', text, (error) => {
        $messageFormBtn.removeAttribute('disabled');
        $messageFormInput.value = '';
        $messageFormInput.focus();
        if (error) {
            return console.log(error);            
        }      
        console.log('Message delivered');        
    });
});

$locationBtn.addEventListener('click', e => {
    // Old browsers might not support it
    if(!navigator.geolocation) {
        return alert('Geolocation is not supported by your browser');
    }

    $locationBtn.setAttribute('disabled', 'disabled');

    navigator.geolocation.getCurrentPosition( (position) => {        
        socket.emit('sendLocation', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        }, () => {
            $locationBtn.removeAttribute('disabled');
            console.log('Server acknowledged the location');            
        });         
    });
});