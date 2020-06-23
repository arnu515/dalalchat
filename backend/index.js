const express = require("express");
const s = require("socket.io");
const http = require("http");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = s(server);
const r = require("./router");
const uh = require("./users");
const { getUserInRoom } = require("./users");

app.use(cors());
app.use(r);

io.on("connection", (s) => {
  s.on("join", ({ name, room }, callback) => {
    const { user, error } = uh.addUser({ id: s.id, name, room });
    if (error) return callback(error);
    s.emit("message", {
      user: "admin",
      text: `Welcome, ${user.name} to ${user.room}`,
    });
    s.broadcast.to(user.room).emit("message", {
      user: "admin",
      text: `${user.name} has joined this room.`,
    });

    s.join(user.room);
    io.to(user.room).emit("roomupdate", {
      room: user.room,
      users: uh.getUserInRoom(user.room),
    });
    callback();
  });

  s.on("messagesent", (message, callback) => {
    const user = uh.getUser(s.id);
    io.to(user.room).emit("message", { user: user.name, text: message });
    callback();
  });

  s.on("disconnect", () => {
    let user = uh.removeUser(s.id);
    io.to(user.room).emit("message", {
      user: "admin",
      text: `${user.name} left the room`,
    });
    io.to(user.room).emit("roomupdate", {
      room: user.room,
      users: uh.getUserInRoom(user.room),
    });
  });
});

const port = process.env.PORT || 5001;
server.listen(port, () => {
  console.log("Server running on port " + port);
});
