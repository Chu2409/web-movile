import express from "express";
import User from "../models/userModel.js";

const router = express.Router();

router.post("/login", async (req, res) => {
  if (req.body.email === undefined || req.body.password === undefined) {
    return res.status(400).json({ message: "Email and password are required" });
  }
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;