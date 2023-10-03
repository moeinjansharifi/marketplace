import asyncHandler from "express-async-handler";
import Place from "../models/PlaceModel.js";

// @desc    Create a place
// @route   POST /api/places
// @access  Private/User
const addPlace = asyncHandler(async (req, res) => {
  const {
    title,
    address,
    addedPhotos,
    description,
    price,
    parkWifi,
    maxGuests,
    bedroom,
    bathroom,
  } = req.body;

  if (!title || !address || !price) {
    res.status(400);
    throw new Error("Invalid data");
  }
  const place = await Place.create({
    userId: req.user.id,
    price,
    title,
    address,
    addedPhotos,
    description,
    parkWifi,
    maxGuests,
    bedroom,
    bathroom,
  });
  res.json(place);
});

// @desc    Update a place
// @route   PUT /api/places/:id
// @access  Private/user
const updatePlace = asyncHandler(async (req, res) => {
  const {
    title,
    address,
    addedPhotos,
    description,
    price,
    parkWifi,
    maxGuests,
    bedroom,
    bathroom,
  } = req.body;

  const place = await Place.findById(req.params.id);

  if (place) {
    place.title = title;
    place.price = price;
    place.description = description;
    place.addedPhotos = addedPhotos;
    place.address = address;
    place.parkWifi = parkWifi;
    place.maxGuests = maxGuests;
    (place.bedroom = bedroom), (place.bathroom = bathroom);

    const updatedPlace = await place.save();
    res.json(updatedPlace);
  } else {
    res.status(404);
    throw new Error("Place not found");
  }
});

// @desc    Delete a place
// @route   DELETE /api/places/:id
// @access  Private/Admin
const deletePlace = asyncHandler(async (req, res) => {
  const place = await Place.findById(req.params.id);

  if (place) {
    await place.deleteOne({ _id: place._id });
    res.json({ message: "place removed" });
  } else {
    res.status(404);
    throw new Error("Place not found");
  }
});

// @desc    Fetch single place
// @route   GET /api/places/:id
// @access  Public
const getPlaceById = asyncHandler(async (req, res) => {
  const place = await Place.findById(req.params.id);
  if (place) {
    return res.json(place);
  } else {
    res.status(404);
    throw new Error("Place not found");
  }
});

// @desc    Fetch all places
// @route   GET /api/places
// @access  Public
const getPlaces = asyncHandler(async (req, res) => {
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};

  const count = await Place.countDocuments({ ...keyword });
  const places = await Place.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ places, page, pages: Math.ceil(count / pageSize) });
});

// @desc    Get User Places
// @route   GET /api/places
// @access  Private
const getUserPlaces = asyncHandler(async (req, res) => {
  const places = await Place.find({ userId: req.user.id });

  if (places) {
    res.status(200).json(places);
  } else {
    res.status(404);
    throw new Error("Places not found");
  }
});

export default {
  addPlace,
  updatePlace,
  deletePlace,
  getPlaceById,
  getPlaces,
  getUserPlaces,
};
