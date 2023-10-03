import asyncHandler from "express-async-handler";
import Booking from "../models/BookingModel.js";

// @desc    Create new booking
// @route   POST /api/account/booking
// @access  Private
const createBooking = asyncHandler(async (req, res) => {
  const { placeId, placeTitle, placeImage, checkIn, checkOut, totalPrice } =
    req.body;

  const booking = await Booking.create({
    placeId,
    placeTitle,
    placeImage,
    user: req.user.id,
    checkIn,
    checkOut,
    totalPrice,
  });

  res.status(200).json(booking);
});

// @desc    Get logged in user booking
// @route   GET /api/account/booking
// @access  Private
const getUserBooking = asyncHandler(async (req, res) => {
  const bookings = await Booking.find({ user: req.user.id });

  res.status(200).json(bookings);
});

export default {
  createBooking,
  getUserBooking,
};
