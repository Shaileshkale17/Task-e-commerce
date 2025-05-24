import express from "express";
import verifyToken from "../Middlewares/verifyToken.js";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  updateProduct,
} from "../Controllers/Products.Controllers.js";
const router = express.Router();

router.post("/", verifyToken, createProduct);
router.get("/", verifyToken, getAllProducts);
router.get("/:id", verifyToken, getProductById);
router.put("/:id", verifyToken, updateProduct);
router.delete("/:id", verifyToken, deleteProduct);
export default router;
