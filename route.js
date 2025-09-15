import { Router } from "express";
import { createUser, login } from "./auth/controller.js";
const router = Router();

// router.get("/users", getStatus);
router.post("/register", createUser); // acts as register
router.post("/login", login);
export { router };