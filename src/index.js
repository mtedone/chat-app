const http = require('http');
const socketio = require('socket.io');
const app = require('./app');

const server = http.createServer(app);
const io = socketio(server);

const port = process.env.PORT;

io.on('connection', () => {
    console.log('New Websocket connection');    
});

server.listen(port, () => {
    console.log(`Server is up and running at port ${port}`);    
});
