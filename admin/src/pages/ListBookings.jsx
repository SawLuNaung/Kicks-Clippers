import { useState, useEffect } from 'react';
import axios from 'axios';
import { backendUrl } from '../config';
import { toast } from 'react-toastify';
import { FaCalendarAlt } from 'react-icons/fa';

// eslint-disable-next-line react/prop-types
const ListBookings = ({ token }) => {
  const [bookings, setBookings] = useState([]);

  const fetchAllBookings = async () => {
    if (!token) {
      return null;
    }

    try {
      const response = await axios.get(`${backendUrl}/api/booking/list`, {
        headers: { token },
      });
      if (response.data.success) {
        setBookings(response.data.bookings); // Set the bookings from the response
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error('Error fetching bookings:', error.response || error);
      toast.error('Error fetching bookings: ' + (error.response?.data?.message || error.message));
    }
  };

  useEffect(() => {
    fetchAllBookings();
  }, [token]);

  return (
    <div>
      <h3>Booking Page</h3>
      <div>
        {bookings.length > 0 ? (
          bookings.map((booking, index) => (
            <div
              key={index}
              className='grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700'
            >
              <FaCalendarAlt />
              <div>
                <p className='py-0.5'>
                  <strong>Name: </strong> {booking.name}
                </p>
                <p className='py-0.5'>
                  <strong>Email: </strong> {booking.email}
                </p>
                <p className='py-0.5'>
                  <strong>Service: </strong> {booking.service}
                </p>
                <p className='py-0.5'>
                  <strong>Time Slot: </strong> {booking.timeSlot}
                </p>
                <p className='py-0.5'>
                  <strong>Date: </strong> {new Date(booking.date).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p>No bookings available.</p>
        )}
      </div>
    </div>
  );
};

export default ListBookings;
