import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Routes, Route } from 'react-router-dom';
import Add from "./pages/Add";
import List from "./pages/List";
import Orders from "./pages/Orders";
import AddBarber from "./pages/AddBarber";  // Renamed to match the import
import ListBarbers from "./pages/ListBarber";  // Renamed to match the import
import ListBookings from "./pages/ListBookings";
import { useEffect, useState } from "react";
import Login from "./components/Login";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { backendUrl } from './config'; // import from config.js

export const currency = '$';

const App = () => {
  const [token, setToken] = useState(
    localStorage.getItem('token')
      ? localStorage.getItem('token')
      : ''
  );

  useEffect(() => {
    localStorage.setItem('token', token);
  }, [token]);

  return (
    <div className='bg-gray-50 min-h-screen'>
      <ToastContainer />
      {token === ""
        ? <Login setToken={setToken} backendUrl={backendUrl} />
        : <>
          <Navbar setToken={setToken} />
          <hr />
          <div className='flex w-full'>
            <Sidebar />
            <div className='w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base'>
              <Routes>
                {/* Existing product-related routes */}
                <Route path='/add' element={<Add token={token} />} />
                <Route path='/list' element={<List token={token} />} />
                <Route path='/orders' element={<Orders token={token} />} />

                {/* New routes for barbers */}
                <Route path='/barbers/add' element={<AddBarber token={token} />} />
                <Route path='/barbers/list' element={<ListBarbers />} />

                {/* New route for bookings */}
                <Route path='/bookings/list' element={<ListBookings token={token} />} />

              </Routes>
            </div>
          </div>
        </>
      }
    </div>
  );
}

export default App;
