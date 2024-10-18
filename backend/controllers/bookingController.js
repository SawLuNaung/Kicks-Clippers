import bookingModel from '../models/bookingModel.js';

export const addBooking = async (req, res) => {
  try {
    const { name, email, date, timeSlot, service } = req.body;
    const newBooking = new bookingModel({ name, email, date, timeSlot, service });
    await newBooking.save();
    res.json({ success: true, message: 'Booking added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error adding booking' });
  }
};

export const listBookings = async (req, res) => {
  try {
    const bookings = await bookingModel.find({});
    res.json({ success: true, bookings });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error fetching bookings' });
  }
};

