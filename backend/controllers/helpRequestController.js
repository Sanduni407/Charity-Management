import HelpRequest from '../models/helpRequestModel.js';

export const submitHelpRequest = async (req, res) => {
  try {

    console.log('REQ.BODY:', req.body);
  console.log('REQ.FILE:', req.file);

    // Get userId from req.user
    const userId = req.user._id;

    // Check required fields
    const { fullName, age, location, typeOfHelp, description, requestedAmount, paymentDetails } = req.body;
    if (!fullName || !typeOfHelp || !description) {
      return res.status(400).json({ success: false, message: 'Please fill all required fields' });
    }

    // Build the help request object
    const newRequest = new HelpRequest({
      userId,
      fullName,
      age,
      location,
      typeOfHelp,
      description,
      requestedAmount: typeOfHelp === 'Financial aid' ? requestedAmount : undefined,
      paymentDetails: typeOfHelp === 'Financial aid' ? paymentDetails : undefined,
      evidenceFileUrl: req.file ? req.file.path : undefined, // store path if file uploaded
    });

    const savedRequest = await newRequest.save();

    res.status(201).json({
      success: true,
      message: 'Help request submitted successfully',
      data: savedRequest
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};






//to fetch all help requests 
export const getAllHelpRequests = async (req, res) => {
  try {
    const requests = await HelpRequest.find().sort({ createdAt: -1 }); 

    res.status(200).json({
      success: true,
      data: requests
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};



// to chnage the requests of the requests 
export const updateRequestStatus = async (req, res) => {
  try {
    const { id } = req.params; // request ID
    const { status } = req.body; // 'Approved' or 'Rejected'

    if (!['Approved', 'Rejected', 'Pending'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status value' });
    }

    const updatedRequest = await HelpRequest.findByIdAndUpdate(
      id,
      { status },
      { new: true } // return the updated document
    );

    if (!updatedRequest) {
      return res.status(404).json({ success: false, message: 'Request not found' });
    }

    res.status(200).json({ success: true, message: 'Status updated', data: updatedRequest });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};




import path from 'path';
import fs from 'fs';

export const downloadEvidence = async (req, res) => {
  try {
    const { id } = req.params;
    const request = await HelpRequest.findById(id);

    if (!request || !request.evidenceFileUrl) {
      return res.status(404).json({ success: false, message: 'File not found' });
    }

    const filePath = path.resolve(request.evidenceFileUrl);

    // Check if file exists
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ success: false, message: 'File does not exist on server' });
    }

    res.download(filePath); // frontend will download the file
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};



