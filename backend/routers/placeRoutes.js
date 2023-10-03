import express from "express";
import placeControllers from "../controllers/placeControllers.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.route("/addnewplace").post(protect, placeControllers.addPlace);

router
  .route("/:id")
  .put(protect, placeControllers.updatePlace)
  .delete(protect, placeControllers.deletePlace)
  .get(placeControllers.getPlaceById);

router.route("/").get(placeControllers.getPlaces);

router.route("/account/places").get(protect, placeControllers.getUserPlaces);

export default router;
