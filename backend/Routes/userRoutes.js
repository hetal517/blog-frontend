const express = require('express');
const router = express.Router();
const {registerUser , loginUser, getProfile , sendTestEmail , forgotPassword , verifyOTP , resetPassword} = require('../Controllers/userController');
const protect = require('../middleware/authMiddleware');

// Register Routes
router.post('/register',registerUser);

router.post('/login',loginUser);

router.get("/profile", protect, getProfile);

router.get("/test-email",sendTestEmail);

router.post("/forgot-password", forgotPassword);

router.post("/verify-otp", verifyOTP);

router.post("/reset-password", resetPassword);

module.exports = router;