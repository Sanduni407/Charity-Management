import mongoose from 'mongoose';

const helpRequestSchema = new mongoose.Schema({

  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true
   },
  fullName: { type: String,
     required: true 
    },
  age: { type: Number 
  },
  location: { type: String

   },
  typeOfHelp: {
    type: String,
    enum: ['Financial Aid', 'Medical Support', 'Food Assistance', 'Educational Support', 'Emergency Relief','Housing Support','Other'],
    required: true
  },
  description: { type: String,
     required: true },
  requestedAmount: { type: Number }, // only for financial aid
  paymentDetails: { type: String },  // optional bank/payment info
  evidenceFileUrl: { type: String }, // stores uploaded file path
  status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
}, { timestamps: true });

const HelpRequest =mongoose.models.helprequest ||  mongoose.model('helprequest', helpRequestSchema);

export default HelpRequest;
