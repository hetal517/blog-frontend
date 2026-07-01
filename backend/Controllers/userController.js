const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const transporter = require('../config/nodemailer');


const registerUser = async (req, res) => {

    try {

        const { name, email, password } = req.body;

        // Hash Password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create User
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword
        });

        res.status(201).json({
            message: "User registered successfully",
            newUser
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};


const loginUser = async(req,res)=>{
    try{
        const {email , password}= req.body;

        //check user
        const existingUser = await User.findOne({email});

        if(!existingUser){
            return res.status(404).json({
             message:"user not found"       
            });
        }

        //compare password

        const isMatch = await bcrypt.compare(password,existingUser.password);

        if(!isMatch){
            return res.status(400).json({
                message:"invalid Credentials"
            });
        }

        //Generate Token

        const token = jwt.sign({id:existingUser._id} , process.env.JWT_SECRET, {expiresIn:"7d"});
        
        res.status(200).json({
            message: "Login successful",
            token
        });
    } catch (error){
        res.status(500).json({
            message: error.message
        });
    }
};


const getProfile = async (req, res) => {

    try {

        const user = await User.findById(req.user.id).select("-password");

        res.status(200).json(user);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};


const sendTestEmail = async (req, res) => {

    try {

        await transporter.sendMail({

            from: process.env.EMAIL_USER,

            to: process.env.EMAIL_USER,

            subject: "Test Email",

            text: "Congratulations! Nodemailer is working successfully 🎉"

        });

        res.json({
            message: "Email Sent Successfully"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: error.message
        });

    }

};

const generateOTP = () => {

    return Math.floor(
        100000 + Math.random() * 900000
    ).toString();

};


const forgotPassword = async (req, res) => {

    try {

        const { email } = req.body;

        const user = await User.findOne({ email });

        if (!user) {

            return res.status(404).json({
                message: "User not found"
            });

        }

        // Generate OTP
        const otp = generateOTP();

        // Save OTP
        user.otp = otp;
        user.otpExpiry = Date.now() + 5 * 60 * 1000;

        await user.save();

        // Send Email
        await transporter.sendMail({

            from: process.env.EMAIL_USER,

            to: user.email,

            subject: "Password Reset OTP",

            html: `
                <h2>Hello ${user.name}</h2>

                <p>Your OTP for password reset is:</p>

                <h1>${otp}</h1>

                <p>This OTP is valid for 5 minutes.</p>
            `

        });

        res.status(200).json({
            message: "OTP sent successfully"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: error.message
        });

    }

};
const verifyOTP = async (req, res) => {

    try {

        const { email, otp } = req.body;

        const user = await User.findOne({ email });

        console.log("Entered OTP:", otp);
        console.log("Database OTP:", user?.otp);
        console.log("OTP Expiry:", user?.otpExpiry);
        console.log("Current Time:", Date.now());

        if (!user) {

            return res.status(404).json({
                message: "User not found"
            });

        }

        if (user.otp !== otp) {

            return res.status(400).json({
                message: "Invalid OTP"
            });

        }

        if (user.otpExpiry < Date.now()) {

            return res.status(400).json({
                message: "OTP Expired"
            });

        }

        res.status(200).json({
            message: "OTP Verified Successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

const resetPassword = async (req, res) => {

    try {

        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {

            return res.status(404).json({
                message: "User not found"
            });

        }

        const hashedPassword = await bcrypt.hash(password, 10);

        user.password = hashedPassword;

        // OTP remove
        user.otp = null;
        user.otpExpiry = null;

        await user.save();

        res.status(200).json({
            message: "Password Reset Successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};



module.exports = { getProfile };
module.exports = {
    registerUser,
    loginUser,
    getProfile,
    sendTestEmail,
    forgotPassword,
    verifyOTP,
    resetPassword
};