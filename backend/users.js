let users = [];

const addUser = ({ id, name, room }) => {
  name = name.trim();
  name.toLowerCase();
  const exist = users.find((u) => u.room === room && u.name === name);
  if (exist) return { error: "Username taken" };
  const user = { id, name, room };
  users.push(user);
  return { user };
};

const removeUser = (id) => {
  const ui = users.findIndex((u) => u.id === id);
  if (ui >= 0) {
    return users.splice(ui, 1)[0];
  }
};

const getUser = (id) => {
  return users.find((u) => u.id === id);
};

const getUserInRoom = (room) => {
  return users.filter((u) => u.room === room);
};

module.exports = { addUser, getUserInRoom, getUser, removeUser };
