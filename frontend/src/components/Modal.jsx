import { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const initialTimeSlots = ['2:00pm', '2:30pm', '3:00pm', '3:30pm', '4:00pm'];

const Modal = ({ isOpen, onClose, service }) => {
  const [step, setStep] = useState(1); // Booking steps
  const [selectedProfessional, setSelectedProfessional] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [availableSlots, setAvailableSlots] = useState(initialTimeSlots); // Add available slots state
  const [bookedSlots, setBookedSlots] = useState([]); // For tracking booked slots
  const [confirmedBooking, setConfirmedBooking] = useState(false); // New state for confirmation message

  useEffect(() => {
    // Fetch already booked slots for the selected date and professional
    const fetchBookedSlots = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/bookings/booked-slots?date=${selectedDate}&professional=${selectedProfessional}`);
        const result = await response.json();
        if (result.success) {
          setBookedSlots(result.bookedSlots);
        }
      } catch (error) {
        console.error('Error fetching booked slots:', error);
      }
    };

    if (selectedProfessional) {
      fetchBookedSlots();
    }
  }, [selectedDate, selectedProfessional]);

  // Remove booked slots from available time slots
  const getAvailableTimeSlots = () => {
    return initialTimeSlots.filter(slot => !bookedSlots.includes(slot));
  };

  const handleBooking = () => {
    setStep(4); // Move to user info input step after confirming booking
  };

  const handleSubmit = async () => {
    const bookingDetails = {
      date: selectedDate,
      timeSlot: selectedTime,
      name,
      email,
      service: service.title
    };

    try {
      const response = await fetch('http://localhost:4000/api/booking/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingDetails),
      });

      const result = await response.json();

      if (result.success) {
        toast.success('Booking confirmed!', {
          position: "top-right",
          autoClose: 5000,
        });
        setBookedSlots([...bookedSlots, selectedTime]); // Add the booked slot to the booked slots state
        setConfirmedBooking(true); // Set the confirmedBooking state to true
      } else {
        toast.error('Failed to confirm booking, please try again.', {
          position: "top-right",
          autoClose: 5000,
        });
      }
    } catch (error) {
      toast.error('Error occurred during booking.', {
        position: "top-right",
        autoClose: 5000,
      });
      console.error(error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-3xl w-full relative">
        <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700" onClick={onClose}>
          &times;
        </button>

        {/* Step 1: Service Details */}
        {step === 1 && (
          <>
            <h2 className="text-xl font-bold mb-2">{service.title}</h2>
            <p className="text-gray-500 mb-2">{service.duration}</p>
            <p className="text-gray-500 mb-4">{service.price}</p>
            <p className="text-gray-700 mb-4">Consultation + Haircut + Styling + Hot Towel</p>
            <button
              className="w-full px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
              onClick={() => setStep(2)}
            >
              Add to booking
            </button>
          </>
        )}

        {/* Step 2: Select Professional */}
        {step === 2 && (
          <div className="flex">
            <div className="w-2/3">
              <h2 className="text-xl font-bold mb-4">Select Professional</h2>
              <div className="grid grid-cols-3 gap-4">
                {['Any professional', 'Ash (Mon - Sat)', 'Amir (Fri - Sat)'].map((professional, index) => (
                  <div
                    key={index}
                    onClick={() => setSelectedProfessional(professional)}
                    className={`border p-4 rounded-lg cursor-pointer ${
                      selectedProfessional === professional ? 'border-black' : 'border-gray-300'
                    }`}
                  >
                    <h3 className="text-lg font-semibold text-center">{professional}</h3>
                  </div>
                ))}
              </div>
            </div>

            <div className="w-1/3 pl-4">
              <div className="border p-4 rounded-lg">
                <h3 className="text-lg font-bold">Summary</h3>
                <p className="text-gray-700 mt-2">{service.title}</p>
                <p className="text-gray-500">{service.duration} with {selectedProfessional || 'any professional'}</p>
                <p className="font-bold mt-4">Total: {service.price}</p>
                <button
                  className="mt-6 w-full px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
                  onClick={() => setStep(3)}
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Time Selection */}
        {step === 3 && (
          <div className="flex">
            <div className="w-2/3">
              <h2 className="text-xl font-bold mb-4">Select Time</h2>
              <DatePicker selected={selectedDate} onChange={setSelectedDate} inline />

              <h3 className="font-semibold mb-2 mt-4">Available Time Slots</h3>
              <div className="space-y-2">
                {getAvailableTimeSlots().map((time, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedTime(time)}
                    className={`w-full px-4 py-2 border rounded-lg text-left ${
                      selectedTime === time ? 'bg-purple-600 text-white' : 'hover:bg-gray-100'
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>

            <div className="w-1/3 pl-4">
              <div className="border p-4 rounded-lg">
                <h3 className="text-lg font-bold">Summary</h3>
                <p className="text-gray-700 mt-2">{service.title}</p>
                <p className="text-gray-500">{service.duration} on {selectedDate.toLocaleDateString()} at {selectedTime}</p>
                <p className="font-bold mt-4">Total: {service.price}</p>
                <button
                  className="mt-6 w-full px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
                  onClick={handleBooking}
                >
                  Confirm Booking
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step 4: User Input for Name and Email */}
        {step === 4 && !confirmedBooking && (
          <div className="flex flex-col">
            <h2 className="text-xl font-bold mb-4">Enter Your Details</h2>
            <div className="mb-4">
              <label className="block mb-2">Name:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg"
                placeholder="Your Name"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg"
                placeholder="Your Email"
              />
            </div>
            <button
              className="w-full px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        )}

        {/* Step 5: Booking Confirmed */}
        {confirmedBooking && (
          <div className="flex flex-col items-center justify-center">
            <h2 className="text-xl font-bold mb-4 text-green-500">Booking Confirmed</h2>
            <p className="text-gray-700">Thank you for booking with us! Your appointment is confirmed.</p>
            <p className="text-gray-500">You will receive a confirmation email shortly.</p>
            <button className="mt-4 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800" onClick={onClose}>
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
