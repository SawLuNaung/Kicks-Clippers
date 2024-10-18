import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Collection from './pages/Collection';
import Blog from './pages/Blog';
import About from './pages/About';
import Booking from './pages/ClipHome'; // Haircut Home Page
import BarberCollection from "./pages/Barbers";
import Contact from './pages/Contact';
import Cart from './pages/Cart';
import Product from './pages/Product';
import Orders from './pages/Orders';
import Login from './pages/Login';
import PlaceOrder from './pages/PlaceOrder';
import MyBookings from "./pages/MyBookings";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SearchBar from "./components/SearchBar";
import TradeSneakers from "./components/TradeSneakers";
import BarberContextProvider from "./context/BarberContext";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BarberDetail from "./pages/BarberDetail";

const App = () => {
  const [isSneakerShop, setIsSneakerShop] = useState(true); // State to toggle

  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
      <ToastContainer />
      <BarberContextProvider>
      <Navbar isSneakerShop={isSneakerShop} setIsSneakerShop={setIsSneakerShop} /> {/* Pass props to Navbar */}
      <SearchBar />
      <Routes>
        {/* Conditionally render routes based on the toggle */}
        <Route path='/login' element={<Login />} />
        <Route path='/' element={isSneakerShop ? <Home /> : <Booking />} /> {/* Toggle between Sneaker Home and Haircut Home */}
        <Route path={isSneakerShop ? '/collection' : '/barbers'} element={isSneakerShop ? <Collection /> : <BarberCollection />} /> {/* Toggle between Collection and Services */}
        <Route path='/blog' element={<Blog />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/products/:productId' element={<Product />} />
        <Route path='/barbers/:barberId' element={<BarberDetail />} />
        <Route path='/my-bookings' element={<MyBookings />} />
        <Route path='/trade/:sneakerId' element={<TradeSneakers />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/place-order' element={<PlaceOrder />} />
        <Route path='/orders' element={<Orders />} />
      </Routes>
      <Footer />
      </BarberContextProvider>
    </div>
  );
};

export default App;
