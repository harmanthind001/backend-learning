import { Router } from "express";
import { createUser, login } from "./controller.js";
const authrouter = Router();

// router.get("/users", getStatus);
authrouter.post("/register", createUser); // acts as register
authrouter.post("/login", login);
export { authrouter };