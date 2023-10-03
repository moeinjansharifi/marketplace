import express from "express";
import userControllers from "../controllers/userControllers.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.route("/register").post(userControllers.registerUser);

router.route("/login").post(userControllers.authUser);

router.route("/account").get(protect, userControllers.getUser);

export default router;
