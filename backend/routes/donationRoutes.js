import express from "express";
import { 
  createCheckoutSession, 
  getAllDonations, 
  getDonationAnalytics, 
  getDonationsByRequestCode,  // optional (see Section 5)
  verifyDonation
} from "../controllers/donationController.js";
import userAuth from "../middleware/auth.js";

const router = express.Router();

router.post("/create-checkout-session", userAuth, createCheckoutSession);
router.get("/admin/all", getAllDonations);  //userAuth
router.get("/request/:requestCode", userAuth, getDonationsByRequestCode);
router.get("/verify/:sessionId", verifyDonation);
router.get("/analytics", getDonationAnalytics);

// (Optional) expose session fetch for success page UI
// router.get("/session/:sessionId", userAuth, getCheckoutSession);

export default router;
