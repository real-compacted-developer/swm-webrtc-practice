const User = require("./Classes/User");
const room = require("./room");

const isRealString = require("../functions/isRealString");

const generateMessage = (from, text) => {
  return { from, text, createAt: new Date().getTime() };
};

const generateLocationMessage = (from, latitude, longitude) => {
  return {
    from,
    url: `https://www.google.com/maps?q=${latitude},${longitude}`,
    createAt: new Date().getTime(),
  };
};

class Socket {
  constructor(io) {
    this.io = io;
  }

  getSocketSwitch = (socket) => {
    const io = this.io;
    console.log("New user connected");

    socket.on("join", ({ name, roomNumber }, callback) => {
      console.log(name, roomNumber);

      if (!isRealString(name) || !isRealString(roomNumber)) {
        return callback("Name and room are required.");
      }

      if (!room.findRoom(roomNumber)) {
        room.addRoom(roomNumber);
      }
      const user = new User(socket.id, name);
      socket.join(roomNumber);
      room.addUser(roomNumber, user);

      console.log(`${name} has join the room`);
      // console.log("nouvel utilisateur", user);

      io.to(roomNumber).emit(
        "updateUserList",
        room.getUserNameList(roomNumber)
      );

      socket.emit(
        "newMessage",
        generateMessage("Admin", "Welcome to the chat app")
      );

      socket.broadcast
        .to(roomNumber)
        .emit("newMessage", generateMessage("Admin", `${name} has joined`));

      callback();
    });

    socket.on("createMessage", (msg, callback) => {
      const ret = room.findUser(socket.id);
      const { room: roomTarget, user: userTarget } = ret;

      if (userTarget) {
        const { number } = roomTarget;
        const { name } = userTarget;
        console.log("createMessage", name);
        io.to(number).emit("newMessage", generateMessage(name, msg.text));
      }

      callback();
    });

    socket.on("createOffer", (data) => {
      const ret = room.findUser(socket.id);
      const { room: roomTarget, user: userTarget } = ret;

      console.log("got Offer");
      if (userTarget) {
        const { number } = roomTarget;
        socket.broadcast.to(number).emit("transmitOffer", data);
      }
    });

    socket.on("createLocationMessage", ({ latitude, longitude }) => {
      const ret = room.findUser(socket.id);
      const { room: roomTarget, user: userTarget } = ret;

      if (userTarget) {
        const { number } = roomTarget;
        const { name } = userTarget;
        io.to(number).emit(
          "newLocationMessage",
          generateLocationMessage(name, latitude, longitude)
        );
      }
    });

    socket.on("askAudio", () => {
      const ret = room.findUser(socket.id);
      const { room: roomTarget, user: userTarget } = ret;

      if (userTarget) {
        console.log("askAudio", userTarget.name);
        const { number } = roomTarget;
        const { name } = userTarget;
        socket.broadcast.to(number).emit("shareAudioModal", name);
      }
    });

    socket.on("disconnect", () => {
      const ret = room.findUser(socket.id);
      const { room: roomTarget, user: userTarget } = ret;

      if (userTarget) {
        const { number } = roomTarget;
        const { name } = userTarget;

        console.log(`${name} has left the room`);
        room.removeUser(number, userTarget);
        console.log(number, userTarget);

        io.to(number).emit("updateUserList", room.getUserNameList(room));
        io.to(number).emit(
          "newMessage",
          generateMessage("Admin", `${name} has left`)
        );
      }
    });
  };

  getDisconnectCallback() {
    console.log("User disconnected");
  }
}

module.exports = Socket;
