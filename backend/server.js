// backend/server.js

import express from "express";
import http from "http";
import cors from "cors";
import dotenv from "dotenv";
import { Server } from "socket.io";

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";



dotenv.config();

connectDB();

const app = express();

const server = http.createServer(app);


// ✅ FIXED CORS (important for phone)

app.use(cors({

  origin: "*",

}));


app.use(express.json());


// ROUTES

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);



// ✅ SOCKET.IO SETUP

const io = new Server(server, {

  cors: {

    origin: "*",

    methods: ["GET", "POST"],

  },

});



const onlineUsers = new Map();



// SOCKET CONNECTION

io.on("connection", (socket) => {

  console.log("User connected:", socket.id);



  // USER CONNECT

  socket.on("user_connected", (userId) => {

    onlineUsers.set(userId, socket.id);

    io.emit("online_users", Array.from(onlineUsers.keys()));

  });



  // SEND MESSAGE

  socket.on("send_message", (data) => {

    const receiverSocketId = onlineUsers.get(data.receiverId);

    if (receiverSocketId) {

      io.to(receiverSocketId).emit("receive_message", data);

    }


    // SEND DELIVERED STATUS

    socket.emit("message_delivered", {

      messageId: data._id,

      receiverId: data.receiverId

    });

  });



  // MESSAGE SEEN

  socket.on("message_seen", (data) => {

    const senderSocketId = onlineUsers.get(data.senderId);

    if (senderSocketId) {

      io.to(senderSocketId).emit("message_seen", {

        messageId: data.messageId

      });

    }

  });



  // TYPING INDICATOR

  socket.on("typing", (data) => {

    const receiverSocketId = onlineUsers.get(data.receiverId);

    if (receiverSocketId) {

      io.to(receiverSocketId).emit("typing", {

        senderId: data.senderId

      });

    }

  });



  // DISCONNECT

  socket.on("disconnect", () => {

    for (let [userId, socketId] of onlineUsers) {

      if (socketId === socket.id) {

        onlineUsers.delete(userId);

      }

    }

    io.emit("online_users", Array.from(onlineUsers.keys()));

    console.log("User disconnected:", socket.id);

  });

});



// ✅ VERY IMPORTANT FIX — allows phone access

const PORT = process.env.PORT || 5000;

server.listen(PORT, "0.0.0.0", () => {

  console.log(`Server running on port ${PORT}`);

});
