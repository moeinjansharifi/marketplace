import React, { useEffect } from "react";
import { differenceInCalendarDays, format } from "date-fns";
import { useSelector, useDispatch } from "react-redux";
import { MoonIcon, CalendarDaysIcon } from "@heroicons/react/24/outline";
import { getUserBooking, reset } from "../features/booking/bookingSlice";
import Image from "./Image";
import Loader from "./Loader";

const BookingPlaces = () => {
  const dispatch = useDispatch();

  const { bookings, isLoading, isError, message } = useSelector(
    (state) => state.booking
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    dispatch(getUserBooking());

    return () => {
      dispatch(reset());
    };
  }, [isError, message, dispatch]);

  return (
    <>
    {isLoading ? (
     <Loader />
    ) : bookings?.length === 0 ? (
      <h1 className="ml-32 mt-6">There is no booking</h1>
    ) : (
      <div className="text-start max-w-3xl mx-auto">
        {bookings?.map((booking, index) => (
          <div
            className="flex gap-4 bg-gray-200 rounded-2xl overflow-hidden my-6"
            key={booking._id}
          >
            <div className="mr-3">
            <Image
                  src={booking.placeImage}
                  className="h-32 w-32"
                />
            </div>
            <div className="py-3 pr-3 grow">
              <h2 className="text-xl">{booking.placeTitle}</h2>
              <div className="text-xl">
                {/* <BookingDates booking={booking} className="mb-2 mt-4 text-gray-500" /> */}
                <div className={"flex gap-1 "}>
                  <MoonIcon className="h-6 w-6" />
                  nights:{" "}
                  {differenceInCalendarDays(
                    new Date(booking.checkOut),
                    new Date(booking.checkIn)
                  )}
                  <div className="flex gap-1 items-center ml-2">
                    <CalendarDaysIcon className="w-6 h-6" />
                    {format(new Date(booking.checkIn), "yyyy-MM-dd")}
                  </div>
                  &rarr;
                  <div className="flex gap-1 items-center">
                    <CalendarDaysIcon className="w-6 h-6" />
                    {format(new Date(booking.checkOut), "yyyy-MM-dd")}
                  </div>
                </div>
                <div className="flex gap-1 mt-3 items-center">
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
                      d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
                    />
                  </svg>
                  <span className="text-2xl">
                    Total price: ${booking.totalPrice}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    )}
  </>
  );
};

export default BookingPlaces;
