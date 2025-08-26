import Donation from "../models/donationModel.js";
import Post from "../models/postModel.js";
import HelpRequest from "../models/helpRequestModel.js";
import Stripe from "stripe";
import axios from "axios";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Generate unique donation ID
const generateDonationId = async (beneficiaryRequestCode) => {
  const donationCount = await Donation.countDocuments({ beneficiaryRequestCode });
  const donationNumber = String(donationCount + 1).padStart(3, '0');
  return `DON-${beneficiaryRequestCode}-${donationNumber}`;
};

// Get exchange rate
const getExchangeRate = async () => {
  try {
    const response = await axios.get('https://api.exchangerate-api.com/v4/latest/USD');
    return response.data.rates.LKR;
  } catch (error) {
    console.error('Exchange rate fetch error:', error);
    return 320; // Fallback rate
  }
};

// Create Stripe checkout session
export const createCheckoutSession = async (req, res) => {
  try {
   

    const { postId, amountLKR, donorName, donorEmail, donorPhone } = req.body;

    // Check if required fields are present
    if (!postId) {
      console.log('ERROR: postId is missing');
      return res.status(400).json({ success: false, message: "Post ID is required" });
    }

    if (!amountLKR) {
      console.log('ERROR: amountLKR is missing');
      return res.status(400).json({ success: false, message: "Amount is required" });
    }

    if (!donorEmail) {
      console.log('ERROR: donorEmail is missing');
      return res.status(400).json({ success: false, message: "Donor email is required" });
    }

    // Get post details
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ success: false, message: "Post not found" });
    }

    // Get exchange rate and convert to USD
    const exchangeRate = await getExchangeRate();
    const amountUSD = (amountLKR / exchangeRate).toFixed(2);

    // Generate donation ID
    const donationId = await generateDonationId(post.beneficiaryRequestCode);

    // Create Stripe session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: {
            name: `Donation for ${post.beneficiaryName}`,
            description: `Beneficiary Request Code: ${post.beneficiaryRequestCode}`
          },
          unit_amount: Math.round(parseFloat(amountUSD) * 100), // Convert to cents
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: `${process.env.FRONTEND_URL}/donation-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/donation-cancelled`,
      metadata: {
        postId,
        helpRequestId: post.helpRequestId.toString(),
        beneficiaryRequestCode: post.beneficiaryRequestCode,
        donationId,
        amountLKR: amountLKR.toString(),
        exchangeRate: exchangeRate.toString(),
        donorName: donorName || '',
        donorEmail,
        donorPhone: donorPhone || ''
      }
    });

    res.status(200).json({
      success: true,
      sessionId: session.id,
      url: session.url,
      donationId
    });

  } catch (error) {
    console.error('Stripe session creation error:', error);
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};

// // Handle Stripe webhook
// export const handleStripeWebhook = async (req, res) => {
//   const sig = req.headers["stripe-signature"];
//   let event;

//   try {
//     event = stripe.webhooks.constructEvent(
//       req.body,                              // raw Buffer (because express.raw)
//       sig,
//       process.env.STRIPE_WEBHOOK_SECRET      // set this in .env
//     );
//   } catch (err) {
//     console.error("❌ Webhook signature verification failed:", err.message);
//     return res.status(400).send(`Webhook Error: ${err.message}`);
//   }

//   console.log("✅ Webhook received:", event.type, "event_id:", event.id);

//   try {
//     if (event.type === "checkout.session.completed") {
//       const session = event.data.object;

//       // Defensive checks
//       if (!session?.metadata?.donationId) {
//         console.warn("Session missing metadata.donationId, skipping save.");
//         return res.json({ received: true });
//       }

//       // Idempotent upsert: create if not exists, else do nothing
//       const existing = await Donation.findOne({ stripeSessionId: session.id });
//       if (existing) {
//         console.log("Donation already saved for session:", session.id);
//         return res.json({ received: true });
//       }

//       const amountUSD = session.amount_total ? session.amount_total / 100 : 0;

//       const donationDoc = {
//         donationId: session.metadata.donationId,
//         beneficiaryRequestCode: session.metadata.beneficiaryRequestCode,
//         postId: session.metadata.postId,
//         helpRequestId: session.metadata.helpRequestId,
//         donorName: session.metadata.donorName,
//         donorEmail: session.metadata.donorEmail,
//         donorPhone: session.metadata.donorPhone,
//         amountLKR: parseFloat(session.metadata.amountLKR || "0"),
//         amountUSD,
//         exchangeRate: parseFloat(session.metadata.exchangeRate || "0"),
//         stripePaymentIntentId: session.payment_intent || null,
//         stripeSessionId: session.id,
//         status: "completed",
//       };

//       await Donation.create(donationDoc);

//       // Update collected amount on Post
//       if (session.metadata.postId && session.metadata.amountLKR) {
//         await Post.findByIdAndUpdate(session.metadata.postId, {
//           $inc: { collectedAmount: parseFloat(session.metadata.amountLKR) }
//         });
//       }

//       console.log(`💾 Donation saved: ${session.metadata.donationId}`);
//     }

//     res.json({ received: true });
//   } catch (err) {
//     console.error("🚨 Webhook handler error:", err);
//     res.status(500).json({ error: "Webhook processing error" });
//   }
// };



// Verify donation after success page (NO webhook)
export const verifyDonation = async (req, res) => {
  try {
    const { sessionId } = req.params;

    // Fetch session from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (!session || session.payment_status !== "paid") {
      return res.status(400).json({ success: false, message: "Payment not completed" });
    }

    // Check if donation already exists (avoid duplicates)
    const existingDonation = await Donation.findOne({ stripeSessionId: session.id });
    if (existingDonation) {
      return res.status(200).json({ success: true, donation: existingDonation });
    }

    // Extract metadata
    const metadata = session.metadata;
    const amountUSD = session.amount_total / 100;

    const donationDoc = {
      donationId: metadata.donationId,
      beneficiaryRequestCode: metadata.beneficiaryRequestCode,
      postId: metadata.postId,
      helpRequestId: metadata.helpRequestId,
      donorName: metadata.donorName,
      donorEmail: metadata.donorEmail,
      donorPhone: metadata.donorPhone,
      amountLKR: parseFloat(metadata.amountLKR || "0"),
      amountUSD,
      exchangeRate: parseFloat(metadata.exchangeRate || "0"),
      stripePaymentIntentId: session.payment_intent,
      stripeSessionId: session.id,
      status: "completed",
    };

    // Save donation
    const newDonation = await Donation.create(donationDoc);

    // Update post collected amount
    await Post.findByIdAndUpdate(metadata.postId, {
      $inc: { collectedAmount: parseFloat(metadata.amountLKR) }
    });

    res.status(200).json({ success: true, donation: newDonation });

  } catch (error) {
    console.error("Verify donation error:", error);
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};



// Get all donations (for admin)
export const getAllDonations = async (req, res) => {
  try {
    const donations = await Donation.find()
      .populate('postId', 'beneficiaryName imageUrl')
      .populate('helpRequestId', 'fullName location')
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: donations });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Get donations by beneficiary request code
export const getDonationsByRequestCode = async (req, res) => {
  try {
    const { requestCode } = req.params;
    
    const donations = await Donation.find({ beneficiaryRequestCode: requestCode })
      .populate('postId', 'beneficiaryName imageUrl')
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: donations });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};