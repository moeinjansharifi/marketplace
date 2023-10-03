import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import placeService from "./placeService";

const initialState = {
  places: [],
  place: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Create new place
export const createPlace = createAsyncThunk(
  "places/create",
  async (placeData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await placeService.createPlace(placeData, token);
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

// Get user Places
export const getUserPlaces = createAsyncThunk(
  "places/getUserPlaces",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await placeService.getUserPlaces(token);
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

// Get All Places
export const getPlaces = createAsyncThunk(
  "places/getPlaces",
  async (_, thunkAPI) => {
    try {
      return await placeService.getPlaces();
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

// Get Details Place
export const placeDetails = createAsyncThunk(
  "places/placeDetails",
  async (id, thunkAPI) => {
    try {
      return await placeService.placeDetails(id);
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

// Delete user Place
export const deletePlace = createAsyncThunk(
  "places/delete",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await placeService.deletePlace(id, token);
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

// Update user Place
export const editPlace = createAsyncThunk(
  "places/update",
  async (placeData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await placeService.editPlace(placeData, token);
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

export const placeSlice = createSlice({
  name: "place",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPlace.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createPlace.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.places.push(action.payload);
      })
      .addCase(createPlace.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getUserPlaces.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserPlaces.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.places = action.payload;
      })
      .addCase(getUserPlaces.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getPlaces.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPlaces.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.places = action.payload;
      })
      .addCase(getPlaces.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(placeDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(placeDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.place = action.payload;
      })
      .addCase(placeDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deletePlace.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deletePlace.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.places = state.places.filter(
          (place) => place._id !== action.payload.id
        );
      })
      .addCase(deletePlace.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(editPlace.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editPlace.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.places = action.payload;
      })
      .addCase(editPlace.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = placeSlice.actions;
export default placeSlice.reducer;
