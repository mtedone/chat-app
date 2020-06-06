const {addUser, removeUser} = require('../src/utils/users');

const user = {
    id: 22, 
    username: 'Marco',
    room: 'London'
};

beforeEach( () => {
    const addedUser = addUser(user);
    expect(addedUser).not.toBeNull();
});
test('Should return the removed user', () => {
    const removedUser = removeUser(user.id);
    expect(removedUser).not.toBeNull();
});