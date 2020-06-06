const http = require('http');
const socketio = require('socket.io');
const Filter = require('bad-words');
const app = require('./app');
const { generateMessage, generateLocationMessage } = require('./utils/messages');
const {addUser, 
    removeUser, 
    clearUsers, 
    getUsers,
    getUser,
    getUsersInRoom} = require('./utils/users');

const server = http.createServer(app);
const io = socketio(server);

const port = process.env.PORT;


io.on('connection', (socket) => {

    socket.on('join', ( { username, room }, callback) => {
        const {error, user} = addUser( { id: socket.id, username, room });
        if (error) {
            return callback(error);
        }
        console.log(user);
        

        socket.join(user.room);

        // Sends only to the connected client
        socket.emit('message', generateMessage('Welcome!')); 

        // Sends to all clients except the one making the connection
        socket.broadcast.to(user.room).emit('message', generateMessage(`${user.username} has joined!`));

        callback(); // OK, no errors
    });
    
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
        io.emit('locationMessage', generateLocationMessage(`https://google.com/maps?q=${position.latitude},${position.longitude}`));
        callback();
    });

    // We can use io.emit as the client has disconnected
    socket.on('disconnect', () => {
        const user = removeUser(socket.id);
        if (user) {
            io.to(user.room).emit('message', generateMessage(`${user.username} has left`));
        }        
    });    
});

server.listen(port, () => {
    console.log(`Server is up and running at port ${port}`);    
});
