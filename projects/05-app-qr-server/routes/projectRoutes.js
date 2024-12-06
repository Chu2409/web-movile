import Project from "../models/projectModel.js";
import express from "express";

const router = express.Router();

router.post("/", async (req, res) => {
  try { 
    const id = await Project.create(req.body);
    res.status(201).json({ message: "Project created", id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const agencies = await Project.getAll();
    res.json(agencies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const agency = await Project.getById(id);
    res.json(agency);
  } catch (error) {
    if (error.message === "Project not found") {
      res.status(404).json({ message: error.message });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
});

router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;

    await Project.update(id, req.body);
    res.json({ message: "Project updated" });
  } catch (error) {
    if (error.message === "Project not found") {
      res.status(404).json({ message: error.message });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await Project.delete(id);
    res.json({ message: "Project deleted" });
  } catch (error) {
    if (error.message === "Project not found") {
      res.status(404).json({ message: error.message });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
});

export default router;
