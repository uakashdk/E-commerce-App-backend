import express from "express";

import {
  createProduct,
  getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
} from "../controller/ProductController.js";

import { createProductValidation, updateProductValidation } from "../Validation/ProductValidation.js";
import { validateRequest } from "../middleware/validateRequest.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// ===============================
// CREATE PRODUCT
// ===============================
router.post("/create-product",  validateRequest(createProductValidation), createProduct);

// ===============================
// GET ALL PRODUCTS
// ===============================
router.get("/products-get-all", getAllProducts);

// ===============================
// GET PRODUCT BY ID
// ===============================
router.get("/product/:id", getProductById);

// ===============================
// UPDATE PRODUCT
// ===============================
router.put("/Update-product/:id",  validateRequest(updateProductValidation), updateProduct);

// ===============================
// DELETE PRODUCT
// ===============================
router.delete("/Delete-product/:id",  deleteProduct);

export default router;