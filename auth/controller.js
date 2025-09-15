import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { LoginData } from "./loginModel.js";


export const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }
  const existingUser = await LoginData.findOne({ email });
  if (existingUser) {
    return res.status(409).json({ error: "Email already exists" });
  }
  const passwordHash = await bcrypt.hash(password, 10);
  const newUser = new LoginData({ name, email, passwordHash });
  await newUser.save();
  return res.status(201).json({ id: newUser._id, name: newUser.name, email: newUser.email });
}

export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }
  const user = await LoginData.findOne({ email });
  if (!user) {
    return res.status(401).json({ error: "Invalid credentials" });
  }
  const isMatch = await bcrypt.compare(password, user.passwordHash);
  if (!isMatch) {
    return res.status(401).json({ error: "Invalid credentials" });
  }
  const token = jwt.sign({ sub: user._id, email: user.email }, process.env.JWT_SECRET || "dev_secret", { expiresIn: "7d" });
  return res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
}