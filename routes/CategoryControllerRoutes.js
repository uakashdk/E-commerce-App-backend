import express from "express";
import { createCategory,updateCategory,getAllCategories,getCategoryById, deleteCategory } from "../controller/CategoryController.js";
import { createCategorySchema, UpdateCategorySchema } from "../Validation/CategoryValidation.js";
import validateRequest from "../middleware/validateRequest.js";

const router = express.Router();


router.post("/create-category", validateRequest(createCategorySchema), createCategory);
router.put("/update-category/:id", validateRequest(UpdateCategorySchema), updateCategory);
router.get("/get-all-categories", getAllCategories);
router.get("/get-category/:id", getCategoryById);

router.delete("/delete-category/:id", deleteCategory);


export default router;