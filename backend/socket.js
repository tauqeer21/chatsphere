// backend/socket.js

export const onlineUsers = new Map();

export const setupSocket = (io) => {

  io.on("connection", (socket) => {

    console.log("Socket connected:", socket.id);


    // User connects

    socket.on("user_connected", (userId) => {

      onlineUsers.set(userId, socket.id);

      io.emit(
        "online_users",
        Array.from(onlineUsers.keys())
      );

    });



    // Send message realtime

    socket.on("send_message", (message) => {

      const receiverSocketId =
        onlineUsers.get(message.receiverId);

      if (receiverSocketId) {

        io.to(receiverSocketId)
          .emit("receive_message", message);

      }

    });



    // Typing indicator

    socket.on("typing", (receiverId) => {

      const receiverSocketId =
        onlineUsers.get(receiverId);

      if (receiverSocketId) {

        io.to(receiverSocketId)
          .emit("typing");

      }

    });



    // Disconnect

    socket.on("disconnect", () => {

      for (
        let [userId, socketId]
        of onlineUsers
      ) {

        if (socketId === socket.id) {

          onlineUsers.delete(userId);

        }

      }

      io.emit(
        "online_users",
        Array.from(onlineUsers.keys())
      );

      console.log("Socket disconnected");

    });

  });

};
