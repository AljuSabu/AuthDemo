import express from "express";
import { signup, login, logout } from "../controllers/authController.js";

const router = express.Router();

//? ///////////////// Routes /////////////////////////

//Signup | method:post | /api/v1/auth/signup
router.post("/signup", signup);

//Login | method:post | /api/v1/auth/login
router.post("/login", login);

//Logout | method:post | /api/v1/auth/logout
router.post("/logout", logout);

export default router;
