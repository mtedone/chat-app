const {addUser, 
        removeUser, 
        clearUsers, 
        getUsers,
        getUser,
        getUsersInRoom} = require('../src/utils/users');

const user = {
    id: 22, 
    username: 'Marco',
    room: 'London'
};

const userTwo = {
    id: 23, 
    username: 'Jenny',
    room: 'Paris'
};

beforeEach( () => {
    const addedUser = addUser(user);
    expect(addedUser).not.toBeNull();
    const addedUserTwo = addUser(userTwo);
    expect(addedUserTwo).not.toBeNull();
});

test('Should return the removed user', () => {    
    const removedUser = removeUser(user.id);
    expect(removedUser).not.toBeNull();
});

test('Should add a user', () => {    
    clearUsers();
    const addedUser = addUser(userTwo);    
    
    expect(addedUser).not.toBeNull();
    expect(addedUser.id).toEqual(userTwo.id);
});

test('Should return an existing user', () => {
    const userOne = getUser(user.id);
    expect(userOne).not.toBeNull();
});

test('Should return undefined', () => {
    const nonExistingId = 55;
    const nonUser = getUser(nonExistingId);
    expect(nonUser).toBeUndefined();
});

test('Should return users in a room', () => {
    const users = getUsersInRoom(user.room);
    expect(users).not.toBeNull();
    expect(users.length).toBe(1);
});