import { v2 as cloudinary } from 'cloudinary';
import barberModel from '../models/barberModel.js';

// Function for adding barbers
const addBarber = async (req, res) => {
  try {
    const { name, expertise, availability, price } = req.body;

    // Parse the availability JSON string to an object
    const parsedAvailability = JSON.parse(availability);

    const image1 = req.files.image1 && req.files.image1[0];

    let imageUrl = '';
    if (image1) {
      try {
        const result = await cloudinary.uploader.upload(image1.path, { resource_type: 'image' });
        imageUrl = result.secure_url;
      } catch (error) {
        console.log('Cloudinary upload error', error);
        return res.json({ success: false, message: 'Image upload failed' });
      }
    }

    const barberData = {
      name,
      expertise,
      availability: parsedAvailability,  // Parsed JSON object for availability
      price: Number(price),
      image: imageUrl,
      date: Date.now(),
    };

    const barber = new barberModel(barberData);
    await barber.save();
    return res.json({ success: true, message: 'Barber added successfully' });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};

// Function for listing all barbers
const listBarbers = async (req, res) => {
  try {
    const barbers = await barberModel.find({});
    res.json({ success: true, barbers });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Function for removing a barber by ID
const removeBarber = async (req, res) => {
  try {
    const { id } = req.body;
    await barberModel.findByIdAndDelete(id);
    res.json({ success: true, message: 'Barber removed successfully' });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Function for fetching a single barber by ID
const singleBarber = async (req, res) => {
  try {
    const { barberId } = req.body;
    const barber = await barberModel.findById(barberId);
    res.json({ success: true, barber });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { addBarber, listBarbers, removeBarber, singleBarber };
