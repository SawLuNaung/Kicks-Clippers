import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  date: { type: Date, required: true },
  timeSlot: { type: String, required: true },
  service: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const bookingModel = mongoose.model('booking', bookingSchema);
export default bookingModel;
