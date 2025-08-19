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

    const userId = req.userId;

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