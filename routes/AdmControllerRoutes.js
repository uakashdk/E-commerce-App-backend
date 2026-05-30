import express from "express";

import {
  getUser,
  UpdateProfile,
  adminDashboard,
} from "../controller/AdmController.js";

import {
  verifyToken,
} from "../Middleware/AuthMiddleware.js";

import {
  updateProfileValidation,
} from "../Validation/UserValidation.js";

import validateRequest from "../Middleware/validateRequest.js";

const router = express.Router();

// =========================
// ADMIN DASHBOARD
// =========================
router.get(
  "/dashboard",
  verifyToken,
  adminDashboard
);

// =========================
// GET LOGGED IN USER
// =========================
router.get(
  "/user",
  verifyToken,
  getUser
);

// =========================
// UPDATE PROFILE
// =========================
router.put(
  "/user/update",
  verifyToken,
  validateRequest(
    updateProfileValidation
  ),
  UpdateProfile
);

export default router;