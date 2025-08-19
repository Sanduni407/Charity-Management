import express from 'express';
import userAuth from '../middleware/auth.js';
import upload from '../middleware/upload.js';
import { submitHelpRequest } from '../controllers/helpRequestController.js';

const router = express.Router();

// Use userAuth and upload.single('evidenceFile') middleware
router.post(
  '/submit',
  upload.single('evidenceFile'),
  userAuth, // <-- this handles file upload
  submitHelpRequest
);

export default router;
