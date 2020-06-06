const http = require('http');
const socketio = require('socket.io');
const Filter = require('bad-words');
const app = require('./app');
const { generateMessage } = require('./utils/messages');

const server = http.createServer(app);
const io = socketio(server);

const port = process.env.PORT;


io.on('connection', (socket) => {
    
    // Sends only to the connected client
    socket.emit('message', generateMessage('Welcome')); 

    // Sends to all clients except the one making the connection
    socket.broadcast.emit('message', generateMessage('A new user has joined'));
    
    socket.on('sendMessage', (message, callback) => {
        const filter = new Filter();
        if (filter.isProfane(message)) {
            return callback('Profanity is not allowed');
        }
        // Sends to everyone
        io.emit('message', generateMessage(message));
        callback();
    });

    socket.on('sendLocation', (position, callback) => {        
        io.emit('locationMessage', `https://google.com/maps?q=${position.latitude},${position.longitude}`);
        callback();
    });

    // We can use io.emit as the client has disconnected
    socket.on('disconnect', () => {
        io.emit('message', generateMessage('User X has left'));
    })
});





server.listen(port, () => {
    console.log(`Server is up and running at port ${port}`);    
});
