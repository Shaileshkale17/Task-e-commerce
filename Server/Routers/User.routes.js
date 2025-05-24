import express from "express";
import {
  CreateUser,
  LoginUser,
  allUser,
  deleteUser,
  getUserById,
  updateUser,
} from "../Controllers/user.Controllers.js";
import verifyToken from "../Middlewares/verifyToken.js";
const router = express.Router();

router.post("/register", CreateUser);
router.post("/login", LoginUser);
router.get("/users", verifyToken, allUser);
router.get("/users/:id", verifyToken, getUserById);
router.put("/users/:id", verifyToken, updateUser);
router.delete("/users/:id", verifyToken, deleteUser);

export default router;
