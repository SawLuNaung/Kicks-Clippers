import mongoose from 'mongoose';

const BarberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  expertise: { type: String, required: true },
  availability: [{ day: String, times: [String] }],
  price: { type: Number, required: true },
  image: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

const barberModel = mongoose.model('Barber', BarberSchema);
export default barberModel;
