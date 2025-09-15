import { User } from "./userModel.js";

export const getStatus = async (req, res) => {
  const users = await User.find();
  return res.json(users);
};
