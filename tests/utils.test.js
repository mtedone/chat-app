const {addUser, removeUser, clearUsers, getUsers} = require('../src/utils/users');

const user = {
    id: 22, 
    username: 'Marco',
    room: 'London'
};


beforeEach( () => {
    clearUsers();
});

test('Should return the removed user', () => {
    const addedUser = addUser(user);
    expect(addedUser).not.toBeNull();
    const removedUser = removeUser(user.id);
    expect(removedUser).not.toBeNull();
});

test('Should add a user', () => {    
    const userTwo = {
        ...user
    };
    const addedUser = addUser(userTwo);    
    
    expect(addedUser).not.toBeNull();
    expect(addedUser.id).toEqual(userTwo.id);
});