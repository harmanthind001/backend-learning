import { Router } from "express";
import { createUser, getStatus } from "./controller.js";
const router = Router();

router.get("/users", getStatus);
router.post("/users", createUser);
export { router };