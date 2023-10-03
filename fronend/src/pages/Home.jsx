import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPlaces, reset } from "../features/place/placeSlice";
import Image from "../components/Image";
import Loader from "../components/Loader";

function Home({filteredData, getSearchResult}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { places, isLoading, isError, message , isSuccess} = useSelector(
    (state) => state.place
  );

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    if (!user) {
      navigate("/login");
    }
    dispatch(getPlaces());

    return () => {
      dispatch(reset());
    };
  }, [isError, message, dispatch]);

  let allPlaces

  if(filteredData && getSearchResult) {
    allPlaces = filteredData;
  } else {
    allPlaces = places.places
  }

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {allPlaces?.length === 0 ? (
            <h1>There is no place</h1>
          ) : (
            allPlaces?.map((place) => (
              <Link to={`/places/${place._id}`} key={place._id}>
                <div className="bg-gray-500 mb-2 rounded-2xl flex">
                  <Image
                    src={place.addedPhotos[0]}
                    className="rounded-2xl object-cover aspect-square"
                  />
                </div>
                <h2 className="font-bold">{place.title}</h2>
                <h3 className="text-sm text-gray-500">{place.address}</h3>
                <div className="mt-1">
                  <span className="font-bold">${place.price}</span> per night
                </div>
              </Link>
            ))
          )}
        </div>
      )}
    </>
  );
}

export default Home;
