import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import Title from "../components/Title";

const MyBookings = () => {
  const { backendUrl, token } = useContext(ShopContext);
  const [bookings, setBookings] = useState([]);

  const loadBookingData = async () => {
    try {
      if (!token) return null;

      const response = await axios.post(`${backendUrl}/api/booking/userbookings`, {}, { headers: { token } });
      if (response.data.success) {
        setBookings(response.data.bookings.reverse()); // Store and reverse to show latest first
      }
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  useEffect(() => {
    loadBookingData();
  }, [token]);

  return (
    <div className='border-t pt-16'>
      <div className='text-2xl'>
        <Title text1={'MY '} text2={'BOOKINGS'} />
      </div>

      <div>
        {
          bookings.map((booking, index) => (
            <div key={index} className='py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
              <div className='flex items-start gap-6 text-sm'>
                <div>
                  <p className='sm:text-base font-medium'>Service: {booking.service}</p>
                  <div className='flex items-center gap-3 mt-2 text-base text-gray=700'>
                    <p>Time Slot: {booking.timeSlot}</p>
                    <p>Date: {new Date(booking.date).toLocaleDateString()}</p>
                  </div>
                  <p className='mt-2'>Email: <span className="text-gray-400">{booking.email}</span></p>
                  <p className='mt-2'>Name: <span className="text-gray-400">{booking.name}</span></p>
                </div>
              </div>
              <div className='md:w-1/2 flex justify-between'>
                <div className='flex items-center gap-2'>
                  <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
                  <p className='text-sm md:text-base'>Booking Confirmed</p>
                </div>
                <button onClick={loadBookingData} className='border px-4 py-2 text-sm font-medium rounded-sm'>Refresh Bookings</button>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default MyBookings;
