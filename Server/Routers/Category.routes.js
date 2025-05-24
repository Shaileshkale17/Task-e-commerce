import express from "express";
import verifyToken from "../Middlewares/verifyToken.js";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
} from "../Controllers/Category.Controllers.js";
const router = express.Router();

router.post("/", verifyToken, createCategory);
router.get("/", verifyToken, getAllCategories);
router.get("/:id", verifyToken, getCategoryById);
router.put("/:id", verifyToken, updateCategory);
router.delete("/:id", verifyToken, deleteCategory);

export default router;
