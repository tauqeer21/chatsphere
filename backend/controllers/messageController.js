// backend/controllers/messageController.js

import Message from "../models/Message.js";


// SEND MESSAGE
export const sendMessage = async (req, res) => {

  try {

    const { senderId, receiverId, text } = req.body;

    const message = await Message.create({

      sender: senderId,

      receiver: receiverId,

      text,

    });

    res.status(201).json(message);

  }

  catch (error) {

    res.status(500).json({

      message: error.message,

    });

  }

};



// GET MESSAGES BETWEEN TWO USERS

export const getMessages = async (req, res) => {

  try {

    const { senderId, receiverId } = req.params;

    const messages = await Message.find({

      $or: [

        {
          sender: senderId,
          receiver: receiverId,
        },

        {
          sender: receiverId,
          receiver: senderId,
        },

      ],

    })

    .sort({ createdAt: 1 });

    res.json(messages);

  }

  catch (error) {

    res.status(500).json({

      message: error.message,

    });

  }

};
