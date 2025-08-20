import express from 'express';
import userAuth from '../middleware/auth.js';
import upload from '../middleware/upload.js';
import { downloadEvidence, getAllHelpRequests, getMyHelpRequests, submitHelpRequest, updateRequestStatus } from '../controllers/helpRequestController.js';

const router = express.Router();

// Use userAuth and upload.single('evidenceFile') middleware
router.post(
  '/submit',
  upload.single('evidenceFile'),
  userAuth, // <-- this handles file upload
  submitHelpRequest
);




// Get all help requests
router.get('/',  getAllHelpRequests);

// Update status
router.patch('/:id/status',  updateRequestStatus);

// Download evidence file
router.get('/:id/download', downloadEvidence);


// Get requests for logged-in beneficiary
router.post('/my-requests', userAuth, getMyHelpRequests);



export default router;
