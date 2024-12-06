import Dish from "../models/dishModel.js";
import express from "express";

const router = express.Router();

router.post("/", async (req, res) => {
  try { 
    const id = await Dish.create(req.body);
    res.status(201).json({ message: "Dish created", id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const agencies = await Dish.getAll();
    res.json(agencies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const agency = await Dish.getById(id);
    res.json(agency);
  } catch (error) {
    if (error.message === "Dish not found") {
      res.status(404).json({ message: error.message });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
});

router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;

    await Dish.update(id, req.body);
    res.json({ message: "Dish updated" });
  } catch (error) {
    if (error.message === "Dish not found") {
      res.status(404).json({ message: error.message });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await Dish.delete(id);
    res.json({ message: "Dish deleted" });
  } catch (error) {
    if (error.message === "Dish not found") {
      res.status(404).json({ message: error.message });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
});

export default router;
