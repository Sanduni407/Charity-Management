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
