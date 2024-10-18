import { useEffect, useState } from 'react';
import axios from 'axios';
import { backendUrl } from '../config';
import { toast } from 'react-toastify';
import { FaUserCircle, FaTrashAlt } from 'react-icons/fa';

// eslint-disable-next-line react/prop-types
const ListBarbers = ({ token }) => {
  const [barbers, setBarbers] = useState([]);

  useEffect(() => {
    const fetchBarbers = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/barbers/list`);
        if (response.data.success) {
          setBarbers(response.data.barbers);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        console.error('Error fetching barbers:', error);
        toast.error('Failed to fetch barbers');
      }
    };

    fetchBarbers();
  }, []);

  // Remove barber function
  const removeBarber = async (id) => {
    if (window.confirm('Are you sure you want to remove this barber?')) {
      try {
        const response = await axios.post(
          `${backendUrl}/api/barbers/remove`,
          { id },
          { headers: { token } }
        );

        if (response.data.success) {
          toast.success(response.data.message);
          setBarbers((prevBarbers) => prevBarbers.filter((barber) => barber._id !== id));
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        console.error('Error removing barber:', error);
        toast.error('Failed to remove barber');
      }
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Barber List</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {barbers.map((barber) => (
          <div key={barber._id} className="bg-white border rounded-lg shadow-md hover:shadow-lg transition duration-300 p-4 relative">
            {/* Barber Image */}
            {barber.image ? (
              <img
                src={barber.image}
                alt={barber.name}
                className="w-full h-40 object-cover rounded-t-md"
              />
            ) : (
              <div className="w-full h-40 bg-gray-200 flex items-center justify-center rounded-t-md">
                <FaUserCircle className="text-6xl text-gray-400" />
              </div>
            )}

            {/* Barber Info */}
            <div className="mt-4">
              <h2 className="text-lg font-semibold text-gray-800">{barber.name}</h2>
              <p className="text-sm text-gray-600">{barber.expertise}</p>
              <p className="text-gray-700 font-bold mt-2">Price: ${barber.price}</p>

              {/* Availability */}
              <div className="mt-3">
                <p className="font-semibold text-gray-800">Availability:</p>
                <ul className="list-disc ml-4 text-sm text-gray-600">
                  {barber.availability.map((slot, index) => (
                    <li key={index}>
                      {slot.day}: {slot.times}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Remove Barber */}
            <button
              onClick={() => removeBarber(barber._id)}
              className="absolute bottom-2 right-2 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full focus:outline-none"
              title="Remove Barber"
            >
              <FaTrashAlt />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListBarbers;
