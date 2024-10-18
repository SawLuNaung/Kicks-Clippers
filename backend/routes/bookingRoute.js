import express from 'express';
import { addBooking, listBookings } from '../controllers/bookingController.js';
import adminAuth from '../middleware/adminAuth.js'; // For admin authentication
import authUser from '../middleware/auth.js';

const bookingRouter = express.Router();

bookingRouter.post('/add', addBooking);        // Endpoint for adding booking from frontend
bookingRouter.get('/list', adminAuth, listBookings); // Endpoint for listing bookings for admin panel


export default bookingRouter;
