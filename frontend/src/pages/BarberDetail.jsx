import { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BarberContext } from '../context/BarberContext';
import { toast } from 'react-toastify';

const BarberDetail = () => {
  const { barberId } = useParams();
  const { barbers } = useContext(BarberContext);
  const [barberData, setBarberData] = useState(null);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const navigate = useNavigate();

  const fetchBarberData = () => {
    const selectedBarber = barbers.find((barber) => barber._id === barberId);
    if (selectedBarber) {
      setBarberData(selectedBarber);
    } else {
      toast.error('Barber not found');
    }
  };

  const handleBooking = () => {
    if (date && time) {
      toast.success('Appointment booked successfully');
      navigate('/barbers');
    } else {
      toast.error('Please select both date and time');
    }
  };

  useEffect(() => {
    fetchBarberData();
  }, [barberId, barbers]);

  return barberData ? (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row gap-10">
        {/* Barber Image */}
        <div className="flex-1">
          <img className="w-full h-auto rounded-lg" src={barberData.image || '/default-barber.png'} alt={barberData.name} />
        </div>
        {/* Barber Details */}
        <div className="flex-1">
          <h1 className="text-3xl font-semibold">{barberData.name}</h1>
          <p className="text-xl mt-4">${barberData.price}</p>
          <div className="mt-6">
            <label className="block mb-2">Select Date:</label>
            <input className="border px-3 py-2 mb-4 w-full" type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
            <label className="block mb-2">Select Time:</label>
            <input className="border px-3 py-2 w-full" type="time" value={time} onChange={(e) => setTime(e.target.value)} required />
          </div>
          <button onClick={handleBooking} className="mt-6 bg-black text-white py-2 px-4">Book Appointment</button>
        </div>
      </div>

      {/* Availability Section */}
      <div className="mt-10">
        <h2 className="text-xl font-medium">Availability</h2>
        <ul className="mt-4">
          {barberData.availability.map((slot, index) => (
            <li key={index} className="mb-2">
              {slot.day}: {slot.times}
            </li>
          ))}
        </ul>
      </div>
    </div>
  ) : (
    <div className="p-6">Loading...</div>
  );
};

export default BarberDetail;
