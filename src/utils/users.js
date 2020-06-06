const users = [];

// addUser, removeUser, getUser, getUsersInRoom

const addUser = ({ id, username, room }) => {
    // Clean the data
    username = username.trim().toLowerCase();
    room = room.trim().toLowerCase();

    // Validate the data
    if (!username || !room) {
        return {
            error: 'Username and room are required'
        };
    }

    // Check if existing user
    const existingUser = users.find( (user) => {
        return user.room === room && user.username === username;
    });

    // Validate username
    if (existingUser) {
        return {
            error: 'Username is in use!'
        };
    }

    // Store user
    const user = { id, username, room};
    users.push(user);
    return user;
};

const removeUser = (user) => {
    const index = users.findIndex( (existingUser) => existingUser.id === user.id );
    if (index !== -1) {
        return users.splice(index, 1)[0];
    }
};

const clearUsers = () => {
    users.splice(0, users.length);
};

const getUsers = () => {
    return users;
}

const getUser = (id) => {
    const index = users.findIndex( (user) => user.id === id);
    if (index !== -1) {
        return users[index];
    }
}

const getUsersInRoom = (room) => {    
    room = room.trim().toLowerCase();
    usersInRoom = users.filter( (user) => user.room === room);
    return usersInRoom;
}

module.exports = { addUser, 
                    removeUser, 
                    clearUsers, 
                    getUsers, 
                    getUser,
                    getUsersInRoom
                };
