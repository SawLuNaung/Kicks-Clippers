import express from 'express';
import cors from 'cors';
import axios from 'axios';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';
import barberRouter from './routes/barberRoute.js';
import bookingRouter from './routes/bookingRoute.js'; // Added booking route

//App Config
const app = express();
const port = process.env.PORT || 4000;
connectDB();
connectCloudinary();

//middlewares
app.use(express.json());
app.use(cors());

//API Endpoints
app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);
app.use('/api/barbers', barberRouter);
app.use('/api/booking', bookingRouter); // Added booking API endpoint

app.get('/', (req, res) => {
  res.send('API working');
});

//Server Listening
app.listen(port, () => console.log('Server started on PORT: ' + port));
