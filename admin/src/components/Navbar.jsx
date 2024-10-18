import PropTypes from 'prop-types';

const Navbar = ({ setToken }) => {
  return (
    <nav className="flex items-center py-3 px-6 sm:px-10 justify-between bg-gray-900 text-white shadow-md">
      <h1 className="text-lg sm:text-xl font-bold tracking-wide">
        Kicks & Clippers
      </h1>
      <button
        onClick={() => setToken('')}
        className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm transition duration-300 ease-in-out"
      >
        Logout
      </button>
    </nav>
  );
};

Navbar.propTypes = {
  setToken: PropTypes.func.isRequired,
};

export default Navbar;
