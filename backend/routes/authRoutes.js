import express from 'express'
import { login, profileDetails, register, verifyOtp } from '../controllers/authController.js';
import userAuth from '../middleware/auth.js';

const authRouter = express.Router();

authRouter.post('/register', register);
authRouter.post('/verify', verifyOtp);
authRouter.post('/login', login);
authRouter.post('/profile', userAuth,  profileDetails);

export default authRouter;