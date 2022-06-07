import express from "express";
const router = express.Router();
import {
  getAllUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";
import { signup } from "../controllers/authController.js";

router.post("/signup", signup);

router.route("/").get(getAllUsers).post(createUser);
router.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);
export default router;
