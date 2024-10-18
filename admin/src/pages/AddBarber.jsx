import { useState } from 'react';
import { assets } from '../assets/assets';
import axios from 'axios';
import { backendUrl } from '../config';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

const AddBarber = ({ token }) => {
  const [image1, setImage1] = useState(false);

  const [name, setName] = useState('');
  const [expertise, setExpertise] = useState('');
  const [availabilityDay, setAvailabilityDay] = useState('');
  const [availabilityTime, setAvailabilityTime] = useState('');
  const [price, setPrice] = useState('');

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    // Structure the availability as a JSON array
    const availability = JSON.stringify([{ day: availabilityDay, times: availabilityTime }]);

    try {
      const formData = new FormData();

      // Append form data
      formData.append('name', name);
      formData.append('expertise', expertise);
      formData.append('availability', availability); // Send as JSON string
      formData.append('price', price);

      // Append image if uploaded
      image1 && formData.append('image1', image1);

      // Make POST request to the backend
      const response = await axios.post(`${backendUrl}/api/barbers/add`, formData, {
        headers: { token, 'Content-Type': 'multipart/form-data' },
      });

      if (response.data.success) {
        toast.success(response.data.message);
        setName('');
        setExpertise('');
        setAvailabilityDay('');
        setAvailabilityTime('');
        setPrice('');
        setImage1(false); // Reset the image
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error('Error adding barber:', error);
      toast.error('Failed to add barber');
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col w-full items-start gap-3">
      <div>
        <p className="mb-2">Upload Image</p>
        <label htmlFor="image1">
          <img className="w-20" src={!image1 ? assets.upload : URL.createObjectURL(image1)} alt="" />
          <input onChange={(e) => setImage1(e.target.files[0])} type="file" id="image1" hidden />
        </label>
      </div>

      <div className="w-full">
        <p className="mb-2">Barber Name</p>
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          className="w-full max-w-[500px] px-3 py-2"
          type="text"
          placeholder="Type barber name here"
          required
        />
      </div>

      <div className="w-full">
        <p className="mb-2">Expertise</p>
        <input
          onChange={(e) => setExpertise(e.target.value)}
          value={expertise}
          className="w-full max-w-[500px] px-3 py-2"
          type="text"
          placeholder="Expertise (e.g., Haircut, Beard Trim)"
          required
        />
      </div>

      <div className="w-full">
        <p className="mb-2">Availability Day (e.g., Monday)</p>
        <input
          onChange={(e) => setAvailabilityDay(e.target.value)}
          value={availabilityDay}
          className="w-full max-w-[500px] px-3 py-2"
          type="text"
          placeholder="Availability Day"
          required
        />
      </div>

      <div className="w-full">
        <p className="mb-2">Availability Time (e.g., 9AM-5PM)</p>
        <input
          onChange={(e) => setAvailabilityTime(e.target.value)}
          value={availabilityTime}
          className="w-full max-w-[500px] px-3 py-2"
          type="text"
          placeholder="Availability Time"
          required
        />
      </div>

      <div className="w-full">
        <p className="mb-2">Price</p>
        <input
          onChange={(e) => setPrice(e.target.value)}
          value={price}
          className="w-full max-w-[500px] px-3 py-2"
          type="number"
          placeholder="Price for service"
          required
        />
      </div>

      <button type="submit" className="w-28 py-3 mt-4 bg-black text-white">
        ADD BARBER
      </button>
    </form>
  );
};

AddBarber.propTypes = {
  token: PropTypes.string.isRequired,
};

export default AddBarber;
