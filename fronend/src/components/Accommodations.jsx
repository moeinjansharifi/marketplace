import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  getUserPlaces,
  deletePlace,
  placeDetails,
  reset,
} from "../features/place/placeSlice";
import Image from "./Image";
import Loader from "./Loader";
import {
  TrashIcon,
  CheckIcon,
  XMarkIcon,
  PlusIcon,
  PencilSquareIcon
} from "@heroicons/react/24/solid";

const Accommodations = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  const { places, isLoading, isError, message } = useSelector(
    (state) => state.place
  );

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure")) {
      try {
        dispatch(deletePlace(id));
        window.location.reload();
      } catch (err) {
        console.log("Error");
      }
    }
  };

   const editHandler =  (id) => {
      navigate(`/places/editPlace/${id}`)
  };

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) {
      navigate("/login");
    }

    dispatch(getUserPlaces());

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

  const arr = Object.values(places);
  
  return (
    <>
      <Link
        className="inline-flex gap-1 bg-gray-200 py-2 px-4 rounded-full my-5"
        to={"/addnewplace"}
      >
        <PlusIcon className="w-6 h-6" />
        Add New Place
      </Link>
      {isLoading && <Loader />}
      {arr.length === 0  ? (
        <h1>There in no house to show</h1>
      ) : (
        arr?.map((place, index) => (
          <div
            className="flex cursor-pointer  bg-gray-100 p-4 rounded-2xl my-2"
            key={index}
          >
            <div className="mr-6">
              {place.addedPhotos === undefined ? <img src="" alt="no image" /> :
             <Image src={place.addedPhotos[0]} className="h-40 w-40" />
              }
            </div>
            <div className="w-10/12">
              <h2 className="text-xl">{place.title}</h2>
              <p className="text-sm mt-2">{place.description}</p>
              <ul className="flex mt-1">
                <li className="mr-6">
                  <span className="text-lg mr-1">Bedroom: </span>
                  <span className="bg-gray-200 rounded-full px-3">
                    {place.bedroom}
                  </span>
                </li>
                <li className="mr-6">
                  <span className="text-lg mr-1">Bathroom: </span>
                  <span className="bg-gray-200 rounded-full px-3">
                    {place.bathroom}
                  </span>
                </li>
                <li className="flex mr-6">
                  {place.parkWifi === undefined ? '' : place.parkWifi[0] === "parking" ? (
                    <CheckIcon className="h-6 w-6 text-green-500 mr-1" />
                  ) : (
                    <XMarkIcon className="h-6 w-6 text-red-500 mr-1" />
                  )}
                  Parking
                </li>
                <li className="flex mr-6">
                  {place.parkWifi === undefined ? '' : place.parkWifi[0] === "wifi" ||
                  place.parkWifi[1] === "wifi" ? (
                    <CheckIcon className="h-6 w-6 text-green-500 mr-1" />
                  ) : (
                    <XMarkIcon className="h-6 w-6 text-red-500 mr-1" />
                  )}
                  Wifi
                </li>
              </ul>
              <p className="mt-2">
                <span>Max number of guests: </span>{" "}
                <span className="">
                  {place.maxGuests}
                </span>
              </p>
            </div>
            <div className="flex gap-2 mx-3 ">
              <button className="h-5 w-5 bg-transparent" onClick={() => editHandler(place._id)}>
                <PencilSquareIcon className="w-full h-full text-gray-800" />
              </button>
              <button
                className="h-5 w-5 bg-transparent"
                onClick={() => deleteHandler(place._id)}
              >
                <TrashIcon className="w-full h-full text-gray-800" />
              </button>
            </div>
          </div>
        ))
      )}
    </>
  );
};

export default Accommodations;
