import express from "express";
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { Currentuser, Login, Register } from "./Controllers/UserControllers.js";
import { AdminMiddleware } from "./Middlewares/AdminMiddleware.js";
import { AddQuiz } from "./Controllers/AdminController.js";
import { AllQuiz, SolveQuiz, singleQuiz } from "./Controllers/AllQuiz.js";

const app = express();
dotenv.config();
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// Routing

app.get("/", (req, res) => {
  res.send("Home");
});
// userController

app.post("/register", Register);
app.post("/login", Login);
app.post("/currentuser", Currentuser);

// Admins

app.post("/addquiz", AdminMiddleware, AddQuiz);
app.post("/allquiz", AllQuiz);
app.post("/singlequiz", singleQuiz);
app.post("/solvequiz", SolveQuiz);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDb Connected"))
  .catch(() => console.log("Error Connection"));

app.listen(8000, () => {
  console.log("app listening in port 8000");
});
