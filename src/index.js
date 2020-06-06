const http = require('http');
const socketio = require('socket.io');
const app = require('./app');

const server = http.createServer(app);
const io = socketio(server);

const port = process.env.PORT;

// The chat payload
let count = 0;

io.on('connection', (socket) => {
    console.log('New Websocket connection');    
    socket.emit('countUpdated', count);

    socket.on('updatedIncrement', () => {
        count += 1;        
        // Emits to all socket connections as opposed to socket.emit
        io.emit('countUpdated', count); 
    });
});



server.listen(port, () => {
    console.log(`Server is up and running at port ${port}`);    
});
