import Channel from "../models/channelModel.js";
import express from "express";

const router = express.Router();

router.post("/", async (req, res) => {
  try { 
    const id = await Channel.create(req.body);
    res.status(201).json({ message: "Channel created", id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const agencies = await Channel.getAll();
    res.json(agencies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const Channel = await Channel.getById(id);
    res.json(Channel);
  } catch (error) {
    if (error.message === "Channel not found") {
      res.status(404).json({ message: error.message });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
});

router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;

    await Channel.update(id, req.body);
    res.json({ message: "Channel updated" });
  } catch (error) {
    if (error.message === "Channel not found") {
      res.status(404).json({ message: error.message });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await Channel.delete(id);
    res.json({ message: "Channel deleted" });
  } catch (error) {
    if (error.message === "Channel not found") {
      res.status(404).json({ message: error.message });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
});

export default router;
