import express from "express";
import User from "../models/user.js";
import Joi from "@hapi/joi";
import Character from "../models/character.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const userExists = await User.findOne({ email: req.body.email });
  if (userExists) {
    return res
      .status(400)
      .json({ error: `El usuario con el email ${req.body.email} ya existe` });
  }
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    pass: req.body.pass,
  });
  try {
    const savedUser = await user.save();
    res.json({
      error: null,
      data: savedUser,
    });
  } catch (error) {
    res.status(400).json({ error: error });
  }
});
router.get("/", async (req, res) => {
  const users = await User.find();
  res.json({
    error: null,
    data: users,
  });
});

router.get("/:id", async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    if (user == undefined) {
      return res
        .status(400)
        .json({ error: `No existe el usuario con id ${req.params.id}` });
    }
    res.json({
      error: null,
      data: user,
    });
  } catch (error) {
    //res.json({ Error: error.message });
    res.status(400).json({ error: error });
  }
});

router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const userDatabase = await User.findOne({ _id: id });
  if (!userDatabase) {
    return res.status(400).json({ error: `El usuario con id ${id} no existe` });
  }
  userDatabase.name = req.body.name;
  userDatabase.email = req.body.email;
  userDatabase.pass = req.body.pass;

  try {
    const userSaved = await userDatabase.save();
    res.json({
      error: null,
      data: userSaved,
    });
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const deleteResponse = await User.deleteOne({ _id: id });
    if (deleteResponse.deletedCount == 1) {
      res.json({
        error: null,
        data: "User deleted",
      });
      return;
    }
    res.status(404).json({ error: "User not found" });
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

//GET /api/users/:id/characters: Get all characters associated with a user
router.get("/:id/characters", async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findOne({ _id: id });
    if (user == undefined) {
      return res
        .status(400)
        .json({ error: `No existe el usuario con id ${req.params.id}` });
    }

    const characters = await Character.find({ userId: id });
    //const characters = user.characters;
    res.json({
      error: null,
      data: characters,
    });
  } catch (error) {
    //res.json({ Error: error.message });
    res.status(400).json({ error: error });
  }
});

export default router;
