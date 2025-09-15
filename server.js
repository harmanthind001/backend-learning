import express from "express";
import { router } from "./route.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { authrouter } from "./auth/route.js";
dotenv.config();
const mongoUrl = process.env.DB_URL;
console.log(mongoUrl);
mongoose
  .connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));
const app = express();
app.use(express.json());
app.get("/", (req, res) => {
  return res.send("Hello World!");
});
app.use("/api", router);
app.use("/auth" ,authrouter)
app.listen(1000, () => {
  console.log("Server is running on http://localhost:1000");
});
