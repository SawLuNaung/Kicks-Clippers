import { useContext, useState } from 'react';
import { Link, NavLink } from "react-router-dom";
import { FaUser, FaShoppingCart, FaBars, FaChevronDown } from 'react-icons/fa';
import { ShopContext } from '../context/ShopContext';


// eslint-disable-next-line react/prop-types
const Navbar = ({ isSneakerShop, setIsSneakerShop }) => {
  const [visible, setVisible] = useState(false);
  const { getCartCount, navigate, token, setToken, setCartItems } = useContext(ShopContext);

  const logout = () => {
    navigate('/login');
    localStorage.removeItem('token');
    setToken('');
    setCartItems({});
  };

  const toggleShop = () => {
    setIsSneakerShop(!isSneakerShop);
  };

  return (
    <div className='flex items-center justify-between py-5 font-medium'>
      <Link to='/'><h1>Kicks & Clippers</h1></Link>

      {/* Navigation Links */}
      <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
        <NavLink to='/' className='flex flex-col items-center gap-1'>
          <p>{isSneakerShop ? 'HOME' : 'HOME'}</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'/>
        </NavLink>
        <NavLink to={isSneakerShop ? '/collection' : '/barbers'} className='flex flex-col items-center gap-1'>
          <p>{isSneakerShop ? 'SHOP' : 'BARBERS'}</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'/>
        </NavLink>
        <NavLink to='/blog' className='flex flex-col items-center gap-1'>
          <p>BLOG</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'/>
        </NavLink>
        <NavLink to='/about' className='flex flex-col items-center gap-1'>
          <p>ABOUT</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'/>
        </NavLink>
        <NavLink to='/contact' className='flex flex-col items-center gap-1'>
          <p>CONTACT</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'/>
        </NavLink>
      </ul>

      <div className='flex items-center gap-6'>
        {/* Toggle Switch with Logos */}
        <div className='relative'>
          <label className=" relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              className="sr-only peer" 
              checked={!isSneakerShop} 
              onChange={toggleShop} 
            />
            <div className="w-14 h-7 bg-gray-300 rounded-full peer-focus:ring-4 peer-focus:ring-gray-200 dark:bg-gray-600 dark:peer-focus:ring-gray-800 peer-checked:bg-gray-700 relative transition-all">
              <div className={`absolute w-7 h-7 bg-white rounded-full shadow-md transition-transform duration-300 ${isSneakerShop ? 'transform translate-x-0' : 'transform translate-x-7'}`}></div>
              <img src='../sneaker.png' alt="Sneaker Icon" className={`absolute left-1 w-5 h-5 mt-1 transition-opacity duration-300 ${isSneakerShop ? 'opacity-100' : 'opacity-50'}`} />
              <img src='haircut.png' alt="Haircut Icon" className={`absolute right-1 w-5 h-5 mt-1 transition-opacity duration-300 ${isSneakerShop ? 'opacity-50' : 'opacity-100'}`} />
            </div>
          </label>
        </div>

        <div className='group relative'>
          <FaUser onClick={() => token ? null : navigate('/login')} className='w-5 cursor-pointer' />
          {token && (
            <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4'>
              <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded'>
                <p onClick={() => navigate('/orders')} className='cursor-pointer hover:text-black'>Orders</p>
                <p onClick={logout} className='cursor-pointer hover:text-black'>Logout</p>
              </div>
            </div>
          )}
        </div>
        
        <Link to='/cart' className='relative'>
          <FaShoppingCart className='w-5 min-w-5' />
          <p className='absolute right-[-10px] bottom-[10px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]'>{getCartCount()}</p>
        </Link>
        
        <FaBars onClick={() => setVisible(true)} className='w-5 cursor-pointer sm:hidden' />
      </div>

      <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible ? 'w-full' : 'w-0'}`}>
        <div className='flex flex-col text-gray-600'>
          <div onClick={() => setVisible(false)} className='flex items-center gap-4 p-3 cursor-pointer'>
            <FaChevronDown className='h-4 rotate-90' />
            <p>Back</p>
          </div>
          <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to=''>HOME</NavLink>
          <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/collection'>COLLECTION</NavLink>
          <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/blog'>BLOG</NavLink>
          <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/about'>ABOUT</NavLink>
          <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/contact'>CONTACT</NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
