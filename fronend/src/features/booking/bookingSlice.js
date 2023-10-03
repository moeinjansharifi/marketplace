import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import bookingSevice from "./bookingService";

const initialState = {
  bookings: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Create new Booking
export const createBooking = createAsyncThunk(
  "booking/create",
  async (bookingData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await bookingSevice.createBooking(bookingData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get user Booking
export const getUserBooking = createAsyncThunk(
  "booking/getUserBooking",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await bookingSevice.getUserBooking(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const bookingSlice = createSlice({
  name: "bookig",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createBooking.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createBooking.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.bookings.push(action.payload);
      })
      .addCase(createBooking.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getUserBooking.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserBooking.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.bookings = action.payload;
      })
      .addCase(getUserBooking.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = bookingSlice.actions;
export default bookingSlice.reducer;
