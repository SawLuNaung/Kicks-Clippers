import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import ShopContextProvider from './context/ShopContext.jsx';
import BarberContextProvider from './context/BarberContext.jsx';  // Import the BarberContextProvider

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ShopContextProvider>
      <BarberContextProvider>  {/* Wrap it with BarberContextProvider */}
        <App />
      </BarberContextProvider>
    </ShopContextProvider>
  </BrowserRouter>
);
