// backend/routes/messageRoutes.js

import express from "express";

import {

  sendMessage,

  getMessages,

} from "../controllers/messageController.js";

const router = express.Router();


// Send message

router.post("/send", sendMessage);


// Get messages

router.get(

  "/:senderId/:receiverId",

  getMessages

);

export default router;
