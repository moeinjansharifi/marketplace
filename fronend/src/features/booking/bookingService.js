import axios from "axios";

// Create new Booking
const createBooking = async (bookingData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(
    "/booking/account/booking",
    bookingData,
    config
  );

  return response.data;
};

// // Get user booking
const getUserBooking = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get("/booking/account/booking", config);

  return response.data;
};

const bookingSevice = {
  createBooking,
  getUserBooking,
};

export default bookingSevice;
