import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import {useDispatch} from 'react-redux'
import {differenceInCalendarDays} from 'date-fns'
import { createBooking, reset } from "../features/booking/bookingSlice";


const BookingForm = ({place}) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        checkIn: '',
        checkOut: '',
        numberOfGuests: '',
        totalPrice: ''
      })
    
      const {checkIn, checkOut, numberOfGuests, totalPrice} = formData
      
      let numberOfNights = 0;
      if (checkIn && checkOut) {
        numberOfNights = differenceInCalendarDays(new Date(checkOut), new Date(checkIn));
      }

      const onChange = (e) => {
        setFormData((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value,
        }))
      }


      const bookThisPlace = (e) => {
        e.preventDefault()
            const bookingData = {
              placeId: place._id,
              placeTitle: place.title,
              placeImage: place.addedPhotos !== undefined ?  place?.addedPhotos[0]: '',
              checkIn, 
              checkOut,
              totalPrice: numberOfNights * place.price
            }

            dispatch(createBooking(bookingData))

            if(bookingData) {
                navigate('/account/booking')
            }
      }
  return (
    <div className="bg-white shadow p-4 rounded-2xl">
    <div className="text-2xl text-center">
      Price: ${place?.price} / per night
    </div>
    <div className="border rounded-2xl mt-4">
      <div className="flex">
        <div className="py-3 px-4">
          <label>Check in:</label>
          <input type="date" name='checkIn' onChange={onChange} />
        </div>
        <div className="py-3 px-4 border-l">
          <label>Check out:</label>
          <input type="date"  name='checkOut' onChange={onChange} />
        </div>
      </div>
      <div className="py-3 px-4 border-t">
        <label>Number of guests:</label>
        <input type="number"  name='numberOfGuests' onChange={onChange} />
      </div>
    </div>
    <button className="primary mt-4" onClick={bookThisPlace} disabled={numberOfNights <= 0}>
      Book this place
      {numberOfNights > 0 && (
          <span> ${numberOfNights * place.price}</span>
        )}
    </button>
  </div>
  )
}

export default BookingForm