import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  placeId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Place",
  },
  placeTitle: { type: String, required: true },
  placeImage: { type: String },
  user: { type: mongoose.Schema.Types.ObjectId, required: true },
  checkIn: { type: Date, required: true },
  checkOut: { type: Date, required: true },
  totalPrice: { type: Number },
});

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;
