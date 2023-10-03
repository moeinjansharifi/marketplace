import React from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import BookingPlaces from "../components/BookingPlaces";
import Accommodations from "../components/Accommodations";


const Account = () => {

  let { subpage } = useParams();

  const { user } = useSelector((state) => state.auth);

  if (subpage === undefined) {
    subpage = "profile";
  }
  const linkClasses = (type = null) => {
    let classes = "py-2 px-4";
    if (type === subpage) {
      classes += " bg-primary text-white rounded-full";
    }

    return classes;
  };
  return (
    <div className="font-semibold mt-4 px-32 pt-3">
      <nav className="w-full flex justify-center mt-4 gap-2">
        <Link to={"/account"} className={linkClasses("profile")}>
          My Profile
        </Link>
        <Link to={"/account/booking"} className={linkClasses("booking")}>
          My Booking
        </Link>
        <Link to={"/account/places"} className={linkClasses("places")}>
          My Accommodations
        </Link>
      </nav>
      {subpage === "profile" ? (
        <div className="text-start max-w-xl mx-auto pl-20 ">
          <p className="my-6 bg-gray-100 px-6 py-3 rounded">
            <span className="text-xl pr-5 font-semibold">Name:</span>
            <span>{user.name}</span>
          </p>
          <p className="my-6 bg-gray-200 px-6 py-3 rounded">
            <span className="text-xl pr-5 font-semibold">Email:</span>
            <span>{user.email}</span>
          </p>
        </div>
      ) : (
        <div className="">
          {subpage === "places" ? (
        <Accommodations />
          ) : (
           <BookingPlaces />
          )}
        </div>
      )}
    </div>
  );
};

export default Account;
