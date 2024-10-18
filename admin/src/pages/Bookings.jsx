import { useState, useEffect } from 'react';
import axios from 'axios';
import { backendUrl } from '../config';
import { toast } from 'react-toastify';
import { FaCalendarAlt } from 'react-icons/fa';

// eslint-disable-next-line react/prop-types
const Bookings = ({ token }) => {

  const [bookings, setBookings] = useState([]);

  const fetchAllBookings = async () => {
    if (!token) {
      return null;
    }
    try {
      const response = await axios.post(backendUrl + '/api/booking/list', {}, { headers: { token } });
      if (response.data.success) {
        setBookings(response.data.bookings);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const statusHandler = async (event, bookingId) => {
    try {
      const response = await axios.post(backendUrl + '/api/booking/status', { bookingId, status: event.target.value }, { headers: { token } });
      if (response.data.success) {
        await fetchAllBookings();
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchAllBookings();
  }, [token]);

  return (
    <div>
      <h3>Bookings Page</h3>
      <div>
        {
          bookings.map((booking, index) => (
            <div className='grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700' key={index}>
              <FaCalendarAlt />
              <div>
                <p>Service: {booking.service}</p>
                <p>Professional: {booking.professional}</p>
                <p>Date: {new Date(booking.date).toLocaleDateString()}</p>
                <p>Time: {booking.timeSlot}</p>
                <p>Name: {booking.name}</p>
                <p>Email: {booking.email}</p>
              </div>
              <select onChange={(event) => statusHandler(event, booking._id)} value={booking.status} className='p-2 font-semibold'>
                <option value="Booked">Booked</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default Bookings;
