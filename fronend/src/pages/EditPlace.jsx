import React, { useState, useEffect } from "react";
import { WifiIcon } from "@heroicons/react/24/solid";
import PhotoUploader from "../components/PhotoUploader";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { editPlace, placeDetails } from "../features/place/placeSlice";
import Loader from "../components/Loader";

const EditPlace = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const [title, setTitle] = useState(''); 
  const [address, setAddress] = useState(''); 
  const [description, setDescription] = useState(''); 
  const [price, setprice] = useState(0); 
  const [maxGuests, setMaxGuests] = useState(0); 
  const [bedroom, setBedroom] = useState(''); 
  const [bathroom, setBathroom] = useState(''); 

  const [addedPhotos, setAddedPhotos] = useState([]);
  const [parkWifi, setParkWifi] = useState([]);

  const { place, isLoading, isError, message } = useSelector((state) => state.place);

  useEffect(() => {
    if (id) {
      dispatch(placeDetails(id));
    
      if(place._id === id) {
        setTitle(place.title)
        setAddress(place.address)
        setDescription(place.description)
        setprice(place.price)
        setMaxGuests(place.maxGuests)
        setBedroom(place.bedroom)
        setBathroom(place.bathroom)
        setAddedPhotos(place.addedPhotos)
        setParkWifi(place.parkWifi)
      } 
    }
  }, [dispatch, id, place._id]);

  function handleCbClick(e) {
    const { checked, name } = e.target;
    if (checked) {
      setParkWifi([...parkWifi, name]);
    } else {
      setParkWifi([
        ...parkWifi.filter((parkWifiName) => parkWifiName !== name),
      ]);
    }
  }

  const submitHandler = (e) => {
    e.preventDefault();

    const placeData = {
    _id: id,
      title,
      address,
      description,
      price,
      addedPhotos,
      maxGuests,
      bedroom,
      bathroom,
      parkWifi,
    };
    dispatch(editPlace(placeData));
    navigate("/account/places");
  };

  return (
    <>
    {isLoading && <Loader />}
        <div className="mt-4 grow">
          <Link
            to={"/account/places"}
            className="ml-32 bg-gray-100 px-4 py-2 rounded"
          >
            Go Back
          </Link>
          <div className="flex items-center justify-around flex-col">
            <h1 className="text-4xl text-center mb-4">Update Place</h1>
            <form className="max-w-md mx-auto" onSubmit={submitHandler}>
              <label htmlFor="title" className="text-xl mt-4">
                Title
              </label>
              <input
                type="text"
                name="title"
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="title, for example: My lovely house"
              />
              <label htmlFor="address" className="text-xl mt-4">
                Address
              </label>
              <input
                type="text"
                name="address"
                value={address}
                onChange={e => setAddress(e.target.value)}
                placeholder="address"
              />
              <PhotoUploader
                addedPhotos={addedPhotos}
                onChange={setAddedPhotos}
              />
              <div className="flex w-full gap-6 my-4">
                <div className="w-full">
                  <label htmlFor="maxGuests" className="text-xl mt-4">
                    Number of Guests
                  </label>
                  <input
                    type="number"
                    name="maxGuests"
                    value={maxGuests}
                    onChange={e => setMaxGuests(e.target.value)}
                  />

                  <label htmlFor="bedroom" className="text-xl mt-4">
                    Bedroom
                  </label>
                  <input
                    type="number"
                    name="bedroom"
                    value={bedroom}
                    onChange={e => setBedroom(e.target.value)}
                  />

                  <label className="flex gap-2 items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={parkWifi.includes("parking")}
                      name="parking"
                      onChange={handleCbClick}
                    />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
                      />
                    </svg>
                    <span>Parking</span>
                  </label>
                </div>
                <div className="w-full">
                  <label htmlFor="price" className="text-xl mt-4">
                    Price
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={price}
                    onChange={e => setprice(e.target.value)}
                  />
                  <label htmlFor="bathroom" className="text-xl mt-4">
                    Bathroom
                  </label>
                  <input
                    type="number"
                    name="bathroom"
                    value={bathroom}
                    onChange={e => setBathroom(e.target.value)}
                  />
                  <label className="flex gap-2 items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={parkWifi.includes("wifi")}
                      name="wifi"
                      onChange={handleCbClick}
                    />
                    <WifiIcon className="w-6 h-6" />
                    <span>Wifi</span>
                  </label>
                </div>
              </div>
              <label htmlFor="description" className="text-xl mt-4">
                Description
              </label>
              <textarea
                name="description"
                value={description}
                onChange={e => setDescription(e.target.value)}
              />
              <button className="primary mt-3">Save</button>
            </form>
          </div>
        </div>
    </>
  );
};

export default EditPlace;
