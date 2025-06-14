const nodemailer = require('nodemailer');
const twilio = require('twilio');

// In-memory OTP storage (use Redis in production)
const otpStore = new Map();

// Generate 6-digit OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Email transporter
const emailTransporter = nodemailer.createTransporter({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Twilio client
const twilioClient = process.env.TWILIO_ACCOUNT_SID ? 
  twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN) : null;

// Send OTP
const sendOTP = async (target, type) => {
  try {
    const otp = generateOTP();
    const key = `${target}_${type}`;
    
    // Store OTP with 5-minute expiry
    otpStore.set(key, {
      otp,
      expires: Date.now() + 5 * 60 * 1000
    });

    if (type === 'email') {
      await emailTransporter.sendMail({
        from: process.env.EMAIL_USER,
        to: target,
        subject: 'CodeQuest - Language Change Verification',
        html: `
          <h2>Language Change Verification</h2>
          <p>Your OTP for language change is: <strong>${otp}</strong></p>
          <p>This OTP will expire in 5 minutes.</p>
        `
      });
    } else if (type === 'mobile' && twilioClient) {
      await twilioClient.messages.create({
        body: `Your CodeQuest language change OTP is: ${otp}. Valid for 5 minutes.`,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: target
      });
    } else {
      // Fallback for development - log OTP
      console.log(`OTP for ${target}: ${otp}`);
    }

    return true;
  } catch (error) {
    console.error('Send OTP error:', error);
    return false;
  }
};

// Verify OTP
const verifyOTP = async (target, otp) => {
  try {
    const key = `${target}_email`;
    const mobileKey = `${target}_mobile`;
    
    const storedData = otpStore.get(key) || otpStore.get(mobileKey);
    
    if (!storedData) {
      return false;
    }

    if (Date.now() > storedData.expires) {
      otpStore.delete(key);
      otpStore.delete(mobileKey);
      return false;
    }

    if (storedData.otp === otp) {
      otpStore.delete(key);
      otpStore.delete(mobileKey);
      return true;
    }

    return false;
  } catch (error) {
    console.error('Verify OTP error:', error);
    return false;
  }
};

module.exports = { sendOTP, verifyOTP };