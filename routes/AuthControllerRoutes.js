import express from "express";
import { registerUser, loginUser } from "../controller/AuthController.js";
import { registerValidation, loginValidation } from "../Validation/UserValidation.js";
import validateRequest from "../middleware/ValidateRequest.js";

const router = express.Router();

router.post("/register", validateRequest(registerValidation), registerUser);
router.post("/login", validateRequest(loginValidation), loginUser);

export default router;