import express from "express";
import Character from "../models/character.js";
import InventoryItem from "../models/inventoryitem.js";
import Joi from "@hapi/joi";
import inventoryitem from "../models/inventoryitem.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const characterExists = await Character.findOne({
    name: req.body.name,
    userId: req.body.userId,
  });
  if (characterExists) {
    return res
      .status(400)
      .json({ error: `El character con el nombre ${req.body.name} ya existe` });
  }
  const character = new Character({
    userId: req.body.userId,
    name: req.body.name,
    level: req.body.level,
    health: req.body.health,
    luck: req.body.luck,
    attack: req.body.attack,
  });
  try {
    const savedCharacter = await character.save();
    res.json({
      error: null,
      data: savedCharacter,
    });
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const character = await Character.findOne({ _id: req.params.id });
    if (character == undefined) {
      return res
        .status(400)
        .json({ error: `No existe el character con id ${req.params.id}` });
    }
    res.json({
      error: null,
      data: character,
    });
  } catch (error) {
    //res.json({ Error: error.message });
    res.status(400).json({ error: error });
  }
});

router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const characterDatabase = await Character.findOne({ _id: req.params.id });
  if (!characterDatabase) {
    return res
      .status(400)
      .json({ error: `El inventory item con id ${req.params.id} no existe` });
  }
  characterDatabase.name = req.body.name;
  characterDatabase.level = req.body.level;
  characterDatabase.health = req.body.health;
  characterDatabase.luck = req.body.luck;
  characterDatabase.attack = req.body.attack;

  try {
    const characterSaved = await characterDatabase.save();
    res.json({
      error: null,
      data: characterSaved,
    });
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const deleteResponse = await Character.deleteOne({ _id: id });
    if (deleteResponse.deletedCount == 1) {
      res.json({
        error: null,
        data: "Character deleted",
      });
      return;
    }
    res.status(404).json({ error: "Character not found" });
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

router.get("/:id/inventory", async (req, res) => {
  const id = req.params.id;
  try {
    const user = await Character.findOne({ _id: id });
    if (user == undefined) {
      return res
        .status(400)
        .json({ error: `No existe el character con id ${req.params.id}` });
    }

    const inventory = await InventoryItem.find({ characterId: id });
    //const characters = user.characters;
    res.json({
      error: null,
      data: inventory,
    });
  } catch (error) {
    //res.json({ Error: error.message });
    res.status(400).json({ error: error });
  }
});

router.post("/:id/inventory", async (req, res) => {
  const id = req.params.id;
  const character = await Character.findOne({ _id: req.params.id });
  if (character == undefined) {
    return res
      .status(400)
      .json({ error: `No existe el character con id ${req.params.id}` });
  }
  const inventoryItem = new InventoryItem({
    characterId: req.body.characterId,
    itemId: req.body.itemId,
    name: req.body.name,
    quantity: req.body.quantity,
  });

  try {
    const savedInventory = await inventoryItem.save();
    res.json({
      error: null,
      data: savedInventory,
    });
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

router.put("/inventory/:id", async (req, res) => {
  const id = req.params.id;
  const inventoryitemDatabase = await InventoryItem.findOne({ _id: id });
  if (!inventoryitemDatabase) {
    return res
      .status(400)
      .json({ error: `El inventory item con id ${id} no existe` });
  }
  inventoryitemDatabase.characterId = req.body.characterId;
  inventoryitemDatabase.itemId = req.body.itemId;
  inventoryitemDatabase.name = req.body.name;
  inventoryitemDatabase.quantity = req.body.quantity;

  try {
    const inventoryItemSaved = await inventoryitemDatabase.save();
    res.json({
      error: null,
      data: inventoryItemSaved,
    });
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

router.delete("/:id/inventory/:itemid", async (req, res) => {
  const itemId = req.params.itemid;
  try {
    const deleteResponse = await InventoryItem.deleteOne({
      itemId: itemId,
      characterId: req.params.id,
    });
    if (deleteResponse.deletedCount == 1) {
      res.json({
        error: null,
        data: "Item deleted from a character's inventory",
      });
      return;
    }
    res.status(404).json({ error: "Item not found" });
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

export default router;
