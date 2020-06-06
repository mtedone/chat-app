const http = require('http');
const socketio = require('socket.io');
const app = require('./app');

const server = http.createServer(app);
const io = socketio(server);

const port = process.env.PORT;


io.on('connection', (socket) => {
    
    // Sends only to the connected client
    socket.emit('message', 'Welcome!'); 

    // Sends to all clients except the one making the connection
    socket.broadcast.emit('message', 'A new user has joined');

    // Sends to everyone
    socket.on('sendMessage', (message) => {
        io.emit('message', message);
    });

    socket.on('sendLocation', (position) => {        
        io.emit('message', `Location: ${position.latitude}, ${position.longitude}`);
    });

    // We can use io.emit as the client has disconnected
    socket.on('disconnect', () => {
        io.emit('message', 'User X has left');
    })
});





server.listen(port, () => {
    console.log(`Server is up and running at port ${port}`);    
});
