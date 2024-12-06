import Task from "../models/taskModel.js";
import express from "express";

const router = express.Router();

router.post("/", async (req, res) => {
  try { 
    const id = await Task.create(req.body);
    res.status(201).json({ message: "Task created", id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const agencies = await Task.getAll();
    res.json(agencies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const agency = await Task.getById(id);
    res.json(agency);
  } catch (error) {
    if (error.message === "Task not found") {
      res.status(404).json({ message: error.message });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
});

router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;

    await Task.update(id, req.body);
    res.json({ message: "Task updated" });
  } catch (error) {
    if (error.message === "Task not found") {
      res.status(404).json({ message: error.message });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await Task.delete(id);
    res.json({ message: "Task deleted" });
  } catch (error) {
    if (error.message === "Task not found") {
      res.status(404).json({ message: error.message });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
});

export default router;
