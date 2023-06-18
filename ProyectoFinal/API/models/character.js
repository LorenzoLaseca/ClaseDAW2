import { Schema, model } from "mongoose";

const characterSchema = Schema({
  userId: {
    type: String,
    require: true,
  },
  name: {
    type: String,
    require: true,
  },
  level: {
    type: Number,
    require: true,
  },
  health: {
    type: Number,
    require: true,
  },
  luck: {
    type: Number,
    require: true,
  },
  attack: {
    type: Number,
    require: true,
  },
});

export default model("Character", characterSchema);
