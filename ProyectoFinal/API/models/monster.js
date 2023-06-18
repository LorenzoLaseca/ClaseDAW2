import { Schema, model } from "mongoose";

const monsterSchema = Schema({
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
  attack: {
    type: Number,
    require: true,
  },
  defense: {
    type: Number,
    require: true,
  },
});

export default model("Monster", monsterSchema);
