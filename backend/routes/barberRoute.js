import express from 'express';
import { listBarbers, addBarber, removeBarber } from '../controllers/barberController.js';
import upload from '../middleware/multer.js';
import adminAuth from '../middleware/adminAuth.js';

const barberRouter = express.Router();

// Route for adding barbers with image upload
barberRouter.post(
  '/add',
  adminAuth,
  upload.fields([{ name: 'image1', maxCount: 1 }]),
  addBarber
);

// Route for listing all barbers
barberRouter.get('/list', listBarbers);

barberRouter.post('/remove', removeBarber);

export default barberRouter;
