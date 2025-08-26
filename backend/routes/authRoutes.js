import express from 'express'
import { forgotPassword, login, profileDetails, register, resetPassword, verifyOtp, verifyResetOtp } from '../controllers/authController.js';
import userAuth from '../middleware/auth.js';

const authRouter = express.Router();

authRouter.post('/register', register);
authRouter.post('/verify', verifyOtp);
authRouter.post('/login', login);
authRouter.post('/profile', userAuth,  profileDetails);


authRouter.post('/forgot-password', forgotPassword);
authRouter.post('/verify-reset-otp', verifyResetOtp);
authRouter.post('/reset-password', resetPassword);

export default authRouter;