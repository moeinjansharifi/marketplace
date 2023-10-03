import express from "express";
import BookingControllers from "../controllers/BookingControllers.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router
  .route("/account/booking")
  .post(protect, BookingControllers.createBooking)
  .get(protect, BookingControllers.getUserBooking);

export default router;
