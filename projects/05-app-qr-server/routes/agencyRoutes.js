import Agency from "../models/agencyModel.js";
import express from "express";

const router = express.Router();

router.post("/", async (req, res) => {
  try { 
    const id = await Agency.create(req.body);
    res.status(201).json({ message: "Agency created", id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const agencies = await Agency.getAll();
    res.json(agencies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const agency = await Agency.getById(id);
    res.json(agency);
  } catch (error) {
    if (error.message === "Agency not found") {
      res.status(404).json({ message: error.message });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
});

router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;

    await Agency.update(id, req.body);
    res.json({ message: "Agency updated" });
  } catch (error) {
    if (error.message === "Agency not found") {
      res.status(404).json({ message: error.message });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await Agency.delete(id);
    res.json({ message: "Agency deleted" });
  } catch (error) {
    if (error.message === "Agency not found") {
      res.status(404).json({ message: error.message });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
});

export default router;
