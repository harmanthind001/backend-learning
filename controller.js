import { User } from "./userModel.js";

export const getStatus = async (req, res) => {
  const users = await User.find();
  return res.json(users);
};
export const createUser = async (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: "Name and email are required" });
  }
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(409).json({ error: "Email already exists" });
  }
  const newUser = new User({ name, email });
  await newUser.save();
  return res.status(201).json(newUser);
}