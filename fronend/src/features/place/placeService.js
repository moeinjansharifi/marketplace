import axios from "axios";

// Create new Place
const createPlace = async (placeData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post("/places/addnewplace", placeData, config);

  return response.data;
};

// Get user places
const getUserPlaces = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get("/places/account/places", config);

  return response.data;
};

// Get All places
const getPlaces = async () => {
  const response = await axios.get("/places");

  return response.data;
};

// Get places delails
const placeDetails = async (id) => {
  const response = await axios.get(`/places/${id}`);
  return response.data;
};

// Delete user place
const deletePlace = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(`/places/${id}`, config);

  return response.data;
};

// Update user place
const editPlace = async (placeData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(
    `/places/${placeData._id}`,
    placeData,
    config
  );

  return response.data;
};
const placeService = {
  createPlace,
  getUserPlaces,
  getPlaces,
  placeDetails,
  deletePlace,
  editPlace,
};

export default placeService;
