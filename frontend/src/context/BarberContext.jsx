import { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

export const BarberContext = createContext();

const BarberContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [barbers, setBarbers] = useState([]);
  const [search, setSearch] = useState('');
  const [showSearch, setShowSearch] = useState(true);

  // Fetch all barbers from the backend
  const getBarbersData = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/barbers/list`);
      if (response.data.success) {
        setBarbers(response.data.barbers);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error('Error fetching barbers:', error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getBarbersData();
  }, []);

  const value = {
    barbers,
    search, setSearch, showSearch, setShowSearch,
  };

  return (
    <BarberContext.Provider value={value}>
      {props.children}
    </BarberContext.Provider>
  );
};

// Define the propTypes for the component
BarberContextProvider.propTypes = {
  children: PropTypes.node.isRequired, // Validates that children must be passed
};

export default BarberContextProvider;
