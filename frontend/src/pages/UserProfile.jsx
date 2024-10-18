import { useEffect, useState } from 'react';
import axios from 'axios';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    const token = localStorage.getItem('token'); // retrieve token from localStorage
    try {
      const response = await axios.get(`${backendUrl}/api/user/profile`, {
        headers: { token }, // pass the token in the headers
      });
      if (response.data.success) {
        setUser(response.data.data); // set user data from response
      } else {
        console.log('Failed to fetch user data', response.data.message);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  return (
    <div className="container">
      {user ? (
        <div className="profile">
          <h2>{user.name} Profile</h2>
          <p>Email: {user.email}</p>
          {/* Add other user details here */}
        </div>
      ) : (
        <p>Loading user profile...</p>
      )}
    </div>
  );
};

export default UserProfile;
