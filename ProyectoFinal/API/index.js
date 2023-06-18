import express, { json, urlencoded } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { connect, mongoose } from "mongoose";
import Joi from "@hapi/joi";
import usersRouter from "./routes/users.js";
import charactersRouter from "./routes/characters.js";
import monstersRouter from "./routes/monsters.js";
import itemsRouter from "./routes/items.js";
import authRouter from "./routes/auth.js";

const app = express();

mongoose.set("strictQuery", true);
const uri = `mongodb://lorenzo:1234@localhost:27017/recuperacion?authMechanism=DEFAULT`;
connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Conectado a la base de datos");
  })
  .catch((e) => {
    console.log("Database error", e);
  });

const corsOptions = {
  origin: "*",
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(json());

app.use("/api/users", usersRouter);
app.use("/api/characters", charactersRouter);
app.use("/api/monsters", monstersRouter);
app.use("/api/items", itemsRouter);
app.use("/api/auth", authRouter);

app.get("/", (req, res) => {
  res.json({ mensaje: "API proyecto final" });
});

app.listen(8000, () => {
  console.log(`Tu servidor esta corriendo en el puerto: ${8000}`);
});
