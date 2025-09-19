import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import userModel from '../models/userModel.js';
import transporter from '../config/nodemailer.js'


export const register = async(req,res)=>{
   
     const{name,email,password,role} = req.body;

     if(!name || !email || !password || !role)
     {
        return res.json({success:false, message:'Missing Details'})
     }

    try{

        const existingUser = await userModel.findOne({email});

        if(existingUser)
        {
            return res.json({success:false , message:"User already exists"});
        }

         const hashedPassword  = await bcrypt.hash(password,10);

          const verifyOtp = Math.floor(100000 + Math.random() * 900000).toString();
          const verifyOtpExpireAt = Date.now() + 5  * 60 * 1000;

          const user = new userModel({
              name,
              email,
              password: hashedPassword,
              role,
              verifyOtp,
              verifyOtpExpireAt,
              isAccountVerified: false,
             });

         const newUser = await user.save();


         //send the email verification otp
        const mailOptions = {
         from: `"EchoKind" <${process.env.SENDER_EMAIL}>`, // friendly name + your email
         to: newUser.email,
         subject: 'Welcome to EchoKind - Verify Your Account',
         html: `
    <div style="font-family: Arial, sans-serif; background-color: #f5f6fa; padding: 20px;">
      <div style="max-width: 500px; margin: auto; background-color: #001f4d; color: white; border-radius: 10px; padding: 30px; text-align: center;">
        <h2 style="margin-bottom: 20px;">Welcome to <span style="color:#00bfff;">EchoKind</span>!</h2>
        <p style="font-size: 16px;">Your verification code is:</p>
        <h1 style="font-size: 32px; letter-spacing: 4px; margin: 20px 0; color: #00bfff;">${verifyOtp}</h1>
        <p style="font-size: 14px; color: #d1d1d1;">This code will expire in 5 minutes.</p>
        <hr style="border: 0; border-top: 1px solid #00bfff; margin: 20px 0;" />
        <p style="font-size: 12px; color: #d1d1d1;">If you did not request this, please ignore this email.</p>
      </div>
    </div>
  `
};


         await transporter.sendMail(mailOptions);

     

        return res.json({success:true,message:'otp has been sent'})



    }catch(error){
        res.json({success:false, message: error.message})
    }

}



export const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.json({ success: false, message: "Email and OTP required" });
  }

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    if (user.isAccountVerified) {
      return res.json({ success: false, message: "Account already verified" });
    }

    if (user.verifyOtp !== otp) {
      return res.json({ success: false, message: "Invalid OTP" });
    }

    if (Date.now() > user.verifyOtpExpireAt) {
      return res.json({ success: false, message: "OTP expired" });
    }

    user.isAccountVerified = true;
    user.verifyOtp = "";
    user.verifyOtpExpireAt = 0;
    await user.save();


    res.json({ success: true, message: "Account verified"});
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};



export const login = async (req,res) =>{
    const {email,password} = req.body;

    if(!email || !password)
    {
        return res.json({success:false, message:'Email and password are required'})
    }


    try{

        const user = await userModel.findOne({email});

        if(!user)
        {
             return res.json({success:false, message:'Invalid email'})
        }

        const isMatched = await bcrypt.compare(password,user.password)

        if(!isMatched)
        {
              return res.json({success:false, message:'Invalid Password'})
        }
         
         const token = jwt.sign({id: user._id}, process.env.JWT_SECRET,{expiresIn:'7d'});

        res.json({success: true,token: token,role: user.role,name: user.name});



    }catch(error)
    {
           res.json({success:false, message: error.message})
    }
}



export const profileDetails = async(req,res) =>{

  try{

    const userId = req.body.userId;

    if(!userId)
    {
      return res.json({success:false , message:'User Id not found'})
    }

      const user = await userModel.findById(userId);

      res.json({success:true, user})

  }catch(err)
  {

  }
}

//create resend otp
//passowrd reset




// Add these functions to your existing authController.js file

// Forgot Password - Send Reset OTP
export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.json({ success: false, message: "Email is required" });
  }

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User with this email does not exist" });
    }

    if (!user.isAccountVerified) {
      return res.json({ success: false, message: "Please verify your account first" });
    }

    // Generate reset OTP
    const resetOtp = Math.floor(100000 + Math.random() * 900000).toString();
    const resetOtpExpireAt = Date.now() + 5 * 60 * 1000; // 5 minutes

    // Update user with reset OTP
    user.resetOtp = resetOtp;
    user.resetOtpExpireAt = resetOtpExpireAt;
    await user.save();

    // Send reset OTP email
    const mailOptions = {
      from: `"EchoKind" <${process.env.SENDER_EMAIL}>`,
      to: email,
      subject: 'Password Reset - EchoKind',
      html: `
        <div style="font-family: Arial, sans-serif; background-color: #f5f6fa; padding: 20px;">
          <div style="max-width: 500px; margin: auto; background-color: #001f4d; color: white; border-radius: 10px; padding: 30px; text-align: center;">
            <h2 style="margin-bottom: 20px;">Password Reset - <span style="color:#00bfff;">EchoKind</span></h2>
            <p style="font-size: 16px;">You requested to reset your password. Your reset code is:</p>
            <h1 style="font-size: 32px; letter-spacing: 4px; margin: 20px 0; color: #00bfff;">${resetOtp}</h1>
            <p style="font-size: 14px; color: #d1d1d1;">This code will expire in 5 minutes.</p>
            <hr style="border: 0; border-top: 1px solid #00bfff; margin: 20px 0;" />
            <p style="font-size: 12px; color: #d1d1d1;">If you did not request this, please ignore this email and your password will remain unchanged.</p>
          </div>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);

    res.json({ success: true, message: "Password reset OTP sent to your email" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};





// Verify Reset OTP (Simple verification, no token generation)
export const verifyResetOtp = async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.json({ success: false, message: "Email and OTP are required" });
  }

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    if (user.resetOtp !== otp) {
      return res.json({ success: false, message: "Invalid OTP" });
    }

    if (Date.now() > user.resetOtpExpireAt) {
      return res.json({ success: false, message: "OTP has expired" });
    }

    res.json({ 
      success: true, 
      message: "OTP verified successfully"
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};




// Reset Password (Simple reset without token, just verify OTP is still valid)
export const resetPassword = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({ success: false, message: "Email and password are required" });
  }

  // Validate password strength
  if (password.length < 8) {
    return res.json({ success: false, message: "Password must be at least 8 characters long" });
  }

  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  if (!hasUppercase || !hasLowercase || !hasNumbers || !hasSpecialChar) {
    return res.json({ 
      success: false, 
      message: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character" 
    });
  }

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    // Check if user has completed OTP verification (resetOtp should still exist and be valid)
    if (!user.resetOtp || Date.now() > user.resetOtpExpireAt) {
      return res.json({ success: false, message: "Please verify OTP first or request a new reset code" });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update user password and clear reset OTP
    user.password = hashedPassword;
    user.resetOtp = "";
    user.resetOtpExpireAt = 0;
    await user.save();

    // Send confirmation email
    const mailOptions = {
      from: `"EchoKind" <${process.env.SENDER_EMAIL}>`,
      to: email,
      subject: 'Password Reset Successful - EchoKind',
      html: `
        <div style="font-family: Arial, sans-serif; background-color: #f5f6fa; padding: 20px;">
          <div style="max-width: 500px; margin: auto; background-color: #001f4d; color: white; border-radius: 10px; padding: 30px; text-align: center;">
            <h2 style="margin-bottom: 20px;">Password Reset Successful - <span style="color:#00bfff;">EchoKind</span></h2>
            <p style="font-size: 16px;">Your password has been successfully reset.</p>
            <p style="font-size: 14px; color: #d1d1d1;">You can now sign in with your new password.</p>
            <hr style="border: 0; border-top: 1px solid #00bfff; margin: 20px 0;" />
            <p style="font-size: 12px; color: #d1d1d1;">If you did not make this change, please contact our support team immediately.</p>
          </div>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);

    res.json({ 
      success: true, 
      message: "Password reset successfully. You can now login with your new password." 
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};