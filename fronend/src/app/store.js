import { configureStore } from "@reduxjs/toolkit";
import authReduce from "../features/auth/authSlice";
import placeReduce from "../features/place/placeSlice";
import bookingReduce from "../features/booking/bookingSlice";

export const store = configureStore({
  reducer: {
    auth: authReduce,
    place: placeReduce,
    booking: bookingReduce,
  },
});
