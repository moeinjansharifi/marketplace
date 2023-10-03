import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { placeDetails, reset } from "../features/place/placeSlice";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/solid";
import PlaceGallary from "../components/PlaceGallary";
import BookingForm from "../components/BookingForm";
import Loader from "../components/Loader";


function PlaceDetails() {
  const dispatch = useDispatch();

  const { id } = useParams();

  const { place, isLoading, isError, message } = useSelector(
    (state) => state.place
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    dispatch(placeDetails(id));

    return () => {
      dispatch(reset());
    };
  }, [isError, id, message, dispatch]);

  const [childData, setChildData] = useState();

  const handleChildData = (data) => {
    setChildData(data);
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="mt-4 pt-8 font-semibold px-32 relative">
          {childData !== false && (
            <>
              <h1 className="text-3xl">{place.title}</h1>
              <Link>{place?.address}</Link>
            </>
          )}
          <PlaceGallary images={place?.addedPhotos} sendData={handleChildData} placeTitle={place.title} />
          {childData !== false && (
            <div className="mt-3 mb-8 grid gap-8 grid-cols-1 md:grid-cols-[2fr_1fr]">
              <div>
                <div className="my-4 ">
                  <h2 className=" text-2xl">Description</h2>
                  <p className="">{place?.description}</p>
                </div>
                <div className="flex">
                  <ul>
                    <li className="my-2">
                      <span className="text-lg mr-3">Bedroom: </span>
                      <span className="bg-gray-200 rounded-full px-3">
                        {place?.bedroom}
                      </span>
                    </li>
                    <li className="">
                      <span className="text-lg mr-2">Bathroom: </span>
                      <span className="bg-gray-200 rounded-full px-3">
                        {place?.bathroom}
                      </span>
                    </li>
                  </ul>
                  <ul className="ml-12 mb-6">
                    <li className="flex my-2">
                      {place?.parkWifi !== undefined ? (
                        place?.parkWifi[0] === "parking" ? (
                          <CheckIcon className="h-6 w-6 text-green-500 mr-1" />
                        ) : (
                          <XMarkIcon className="h-6 w-6 text-red-500 mr-1" />
                        )
                      ) : (
                        ""
                      )}
                      Parking
                    </li>
                    <li className="flex">
                      {place?.parkWifi !== undefined ? (
                        place?.parkWifi[0] === "wifi" ||
                        place?.parkWifi[1] === "wifi" ? (
                          <CheckIcon className="h-6 w-6 text-green-500 mr-1" />
                        ) : (
                          <XMarkIcon className="h-6 w-6 text-red-500 mr-1" />
                        )
                      ) : (
                        ""
                      )}{" "}
                      Wifi
                    </li>
                  </ul>
                </div>
                <p>
                  <span>Max number of guests: </span>{" "}
                  <span className="bg-gray-200 rounded-full px-3">
                    {place.maxGuests}
                  </span>
                </p>
              </div>
              <div>
             <BookingForm  place={place}/>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default PlaceDetails;
