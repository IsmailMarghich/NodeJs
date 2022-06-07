import { User } from "../models/userModel.js";

export const getAllUsers = async (req, res) => {
  const users = await User.find();
  res.status(200).json({
    status: "success",
    data: users,
  });
};

export const createUser = (req, res) => {
  res.status(200).json({
    status: "success",
  });
};

export const getUser = (req, res) => {
  res.status(200).json({
    status: "success",
  });
};

export const updateUser = (req, res) => {
  res.status(200).json({
    status: "success",
  });
};

export const deleteUser = (req, res) => {
  res.status(200).json({
    status: "success",
  });
};
