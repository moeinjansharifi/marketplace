import mongoose from "mongoose";

const placeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    title: {
      type: String,
      required: [true, "Please add a title"],
    },
    address: {
      type: String,
      required: [true, "Please add address"],
    },
    addedPhotos: [String],
    description: {
      type: String,
    },
    parkWifi: [String],
    maxGuests: {
      type: Number,
      required: [true, "Please add the max number of guests"],
    },
    price: {
      type: Number,
      required: [true, "Please add price"],
    },
    bedroom: { type: Number },
    bathroom: { type: Number },
  },
  {
    timestamps: true,
  }
);

const Place = mongoose.model("Place", placeSchema);

export default Place;
