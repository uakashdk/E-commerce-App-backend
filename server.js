import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { Connection } from "./config/Db.js";
import AuthRoutes from "./routes/AuthControllerRoutes.js";

const app = express();

dotenv.config();
Connection();

// ✅ Middleware FIRST
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));
// Routes AFTER middleware
app.use("/api/auth", AuthRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});