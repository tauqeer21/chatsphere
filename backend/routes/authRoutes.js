// backend/routes/authRoutes.js

import express from "express";

import {
  signup,
  login
} from "../controllers/authController.js";

import User from "../models/User.js";

const router = express.Router();


// ===============================
// SIGNUP
// ===============================

router.post("/signup", signup);



// ===============================
// LOGIN
// ===============================

router.post("/login", login);



// ===============================
// GET ALL USERS (for sidebar)
// ===============================

router.get("/users", async (req, res) => {

  try {

    const users = await User.find()
      .select("-password"); // hide password

    res.json(users);

  }

  catch (error) {

    res.status(500).json({

      message: error.message

    });

  }

});



export default router;
