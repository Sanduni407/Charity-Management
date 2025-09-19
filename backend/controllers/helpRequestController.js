import HelpRequest from '../models/helpRequestModel.js';
import path from 'path';
import fs from 'fs';



// Generate unique beneficiary request code
const generateBeneficiaryCode = async () => {
  const lastRequest = await HelpRequest.findOne().sort({ createdAt: -1 });
  
  if (!lastRequest) {
    return "BR1001"; // First request
  }
  
  // Extract number from last code (BR1001 -> 1001)
  const lastNumber = parseInt(lastRequest.beneficiaryRequestCode.replace('BR', ''));
  const newNumber = lastNumber + 1;
  
  return `BR${newNumber}`;
};








export const submitHelpRequest = async (req, res) => {
  try {

  

    // Get userId from req.user
    const userId = req.user._id;


    // Generate beneficiary request code
    const beneficiaryRequestCode = await generateBeneficiaryCode();

    // Check required fields
    const { fullName, age, location, typeOfHelp, description, requestedAmount, paymentDetails } = req.body;
    if (!fullName || !typeOfHelp || !description) {
      return res.status(400).json({ success: false, message: 'Please fill all required fields' });
    }

    // Build the help request object
    const newRequest = new HelpRequest({
      userId,
      beneficiaryRequestCode,
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





// Fetch requests for logged-in beneficiary
export const getMyHelpRequests = async (req, res) => {
  try {
    const userId = req.user._id; // get logged-in user's ID

    const requests = await HelpRequest.find({ userId }).sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: requests });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};





export const updateHelpRequest = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Find existing request
    const existingRequest = await HelpRequest.findById(id);
    if (!existingRequest) {
      return res.status(404).json({ success: false, message: 'Request not found' });
    }

    // Only allow editing pending requests
    if (existingRequest.status !== 'Pending') {
      return res.status(400).json({ success: false, message: 'Only pending requests can be edited' });
    }

    // Handle file update - if new file uploaded, delete old one
    if (req.file && existingRequest.evidenceFileUrl && fs.existsSync(existingRequest.evidenceFileUrl)) {
      fs.unlinkSync(existingRequest.evidenceFileUrl);
    }

    // Prepare update data
    const { fullName, age, location, typeOfHelp, description, requestedAmount, paymentDetails } = req.body;
    
    const updateData = {
      ...req.body,
      evidenceFileUrl: req.file ? req.file.path : existingRequest.evidenceFileUrl
    };

    const updatedRequest = await HelpRequest.findByIdAndUpdate(id, updateData, { new: true });

    res.status(200).json({
      success: true,
      message: 'Request updated successfully',
      data: updatedRequest
    });

  } catch (error) {
    // Cleanup new file if error occurred
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};



// Get single help request by ID
export const getHelpRequestById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const request = await HelpRequest.findById(id);
    
    if (!request) {
      return res.status(404).json({ success: false, message: 'Request not found' });
    }

    res.status(200).json({ success: true, data: request });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};



export const deleteHelpRequest = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Find the request
    const request = await HelpRequest.findById(id);
    
    if (!request) {
      return res.status(404).json({ success: false, message: 'Request not found' });
    }

    // Only allow deleting pending requests
    if (request.status !== 'Pending') {
      return res.status(400).json({ success: false, message: 'Only pending requests can be deleted' });
    }

    // Delete associated file if exists
    if (request.evidenceFileUrl && fs.existsSync(request.evidenceFileUrl)) {
      fs.unlinkSync(request.evidenceFileUrl);
    }

    // Delete from database
    await HelpRequest.findByIdAndDelete(id);

    res.status(200).json({ 
      success: true, 
      message: 'Request deleted successfully' 
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

