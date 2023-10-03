import React, {useEffect, useState} from "react";
import { WifiIcon} from "@heroicons/react/24/solid"
import PhotoUploader from "../components/PhotoUploader";
import {useSelector, useDispatch} from 'react-redux'
import { Link, useNavigate } from "react-router-dom";
import { createPlace, reset } from "../features/place/placeSlice";
import Message from '../components/Message'

const AddNewPlace = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {isError, message, isSuccess } = useSelector(
    (state) => state.place
  );

  const [formData, setFormData] = useState({
    title: '',
    address: '',
    description: "",
    price: "",
    maxGuests: "",
    bedroom : '',
    bathroom: '',
  })

  const [addedPhotos,setAddedPhotos] = useState([]);
  const [parkWifi, setParkWifi] = useState([])


  const {title, address, description, price, maxGuests, bedroom, bathroom, } = formData

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  function handleCbClick(e) {
    const {checked,name} = e.target;
    if (checked) {
      setParkWifi([...parkWifi,name]);
    } else {
      setParkWifi([...parkWifi.filter(parkWifiName => parkWifiName !== name)]);
    }
  }

  useEffect(() => {

    return () => {
      dispatch(reset())
    }

  } ,[dispatch, isSuccess])

  const submitHandler = (e) => {
    e.preventDefault();

    const placeData = {
      title, 
      address,
      description, 
      price, 
      addedPhotos,
      maxGuests, 
      bedroom, 
      bathroom,
      parkWifi
    }
    dispatch(createPlace(placeData))
    if(title && address && price ) {
      navigate('/account/places')
    }
  };

  return (
    <div className="mt-4 grow">
     <Link to={'/account/places'} className="ml-32 bg-gray-100 px-4 py-2 rounded">Go Back</Link>
     <div className="flex items-center justify-around flex-col">
      {isError && <Message>{message}</Message>}
     <h1 className="text-4xl text-center mb-4">Add New Place</h1>
      <form className="max-w-md mx-auto" onSubmit={submitHandler}>
        <label htmlFor="title" className="text-xl mt-4">
          Title 
        </label>
        <input type="text" name="title" value={title} onChange={onChange} placeholder="title, for example: My lovely house" />
        <label htmlFor="address" className="text-xl mt-4">
          Address
        </label>
        <input type="text" name="address" value={address} onChange={onChange} placeholder="address" />
        <PhotoUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />
        <div className="flex w-full gap-6 my-4">
          <div className="w-full">
          <label htmlFor="maxGuests" className="text-xl mt-4">
              Number of Guests
            </label>
            <input type="number" name="maxGuests" value={maxGuests} onChange={onChange} />

            <label htmlFor="bedroom" className="text-xl mt-4">
              Bedroom
            </label>
            <input type="number" name="bedroom" value={bedroom} onChange={onChange} />

            <label className="flex gap-2 items-center cursor-pointer">
              <input type="checkbox" checked={parkWifi.includes('parking')} name="parking" onChange={handleCbClick} />
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
            <input type="number" name="price" value={price} onChange={onChange} />
            <label htmlFor="bathroom" className="text-xl mt-4">
              Bathroom
            </label>
            <input type="number" name="bathroom" value={bathroom} onChange={onChange} />
            <label className="flex gap-2 items-center cursor-pointer">
              <input type="checkbox" checked={parkWifi.includes('wifi')} name="wifi" onChange={handleCbClick} />
             <WifiIcon className="w-6 h-6" />
              <span>Wifi</span>
            </label>
          </div>
        </div>
        <label htmlFor="description" className="text-xl mt-4">
          Description
        </label>
        <textarea name="description" value={description} onChange={onChange} />
        <button className="primary mt-3">Save</button>
      </form>
     </div>
    </div>
  );
};

export default AddNewPlace;
