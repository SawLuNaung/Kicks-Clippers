import { NavLink } from "react-router-dom";
import { FaPlus, FaList, FaReceipt, FaCut } from 'react-icons/fa';

const Sidebar = () => {
  return (
    <div className='md:w-[18%] w-[60px] min-h-screen bg-gray-800 text-white transition-all duration-300 ease-in-out'>
      <div className='flex flex-col gap-4 pt-6 md:pl-[20%] pl-[10px] text-[15px] md:text-base'>

        {/* Add Items Link */}
        <NavLink
          className='flex items-center gap-3 px-3 py-2 hover:bg-gray-700 rounded-md transition-all duration-300 ease-in-out'
          to='/add'
        >
          <FaPlus className='w-5 h-5' />
          <p className='hidden md:block'>Add Items</p>
        </NavLink>

        {/* List Items Link */}
        <NavLink
          className='flex items-center gap-3 px-3 py-2 hover:bg-gray-700 rounded-md transition-all duration-300 ease-in-out'
          to='/list'
        >
          <FaList className='w-5 h-5' />
          <p className='hidden md:block'>List Items</p>
        </NavLink>

        {/* Order Items Link */}
        <NavLink
          className='flex items-center gap-3 px-3 py-2 hover:bg-gray-700 rounded-md transition-all duration-300 ease-in-out'
          to='/orders'
        >
          <FaReceipt className='w-5 h-5' />
          <p className='hidden md:block'>Order Items</p>
        </NavLink>

        {/* Add Barber Link */}
        <NavLink
          className='flex items-center gap-3 px-3 py-2 hover:bg-gray-700 rounded-md transition-all duration-300 ease-in-out'
          to='/barbers/add'
        >
          <FaCut className='w-5 h-5' />
          <p className='hidden md:block'>Add Barber</p>
        </NavLink>

        {/* List Barbers Link */}
        <NavLink
          className='flex items-center gap-3 px-3 py-2 hover:bg-gray-700 rounded-md transition-all duration-300 ease-in-out'
          to='/barbers/list'
        >
          <FaList className='w-5 h-5' />
          <p className='hidden md:block'>List Barbers</p>
        </NavLink>

        {/* List Bookings Link */}
        <NavLink
          className='flex items-center gap-3 px-3 py-2 hover:bg-gray-700 rounded-md transition-all duration-300 ease-in-out'
          to='/bookings/list'
        >
          <FaList className='w-5 h-5' />
          <p className='hidden md:block'>List Bookings</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
