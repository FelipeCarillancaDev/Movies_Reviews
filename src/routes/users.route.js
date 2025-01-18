import express from "express";
import {
  findAllUsers,
  createUsers,
  findUserById,
  deleteUser,
  updateUser,
  register,
  login
} from "../controller/user.controller.js";

const router = express.Router();

router.get("/", findAllUsers);
router.post("/", createUsers);
router.get("/:id", findUserById);
router.delete("/id", deleteUser);
router.put("/id", updateUser);
router.post("/register", register);
router.post("/login", login);

export default router;