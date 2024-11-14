import bcrypt from 'bcryptjs';
import crypto from 'crypto';

import {User} from '../models/user.model.js';
import { generateTokenAndSetCookie, generateVerificationToken } from '../utils/generate.util.js';
import { sendVerificationEmail, sendWelcomeEmail, sendPasswordResetEmail , sendResetSuccessEmail} from '../mailtrap/emails.js';

export const signup = async (req, res) =>{
  const {email, password, name, role} = req.body;
  try {
  if(!email || !name ||!password  || !role){
    throw new Error( 'All fields are required');
  }

  const userExists = await User.findOne({email});
  if(userExists){
    return res.status(400).json({success: false, message: 'User already exists'});
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const verificationToken = generateVerificationToken();
  const user  = new User({
    email, 
    password: hashedPassword,
    name, 
    role, 
    verificationToken,
    verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000 // 24 hours
  });

  await user.save();
  
  // jwt 
  generateTokenAndSetCookie(res, user._id);

  // send verification email
  await sendVerificationEmail(user.email, verificationToken);

  res.status(201).json({
    success: true, 
    message: 'User created successfully',
     user: {
      ...user._doc,
      password: undefined,
  }
  });

  } catch (err) {
    res.status(400).json({success: false, message: err.message});
  }
}

export const verifyEmail = async (req, res) =>{
  const { code } = req.body;
  try {
    const user = await User.findOne({
      verificationToken: code,
      verificationTokenExpiresAt: {$gt: Date.now()}
    });
    if(!user){
      return res.status(400).json({success: false, message: 'Invalid or expired verification code'});
    }


    user.isVerified = true;

    //delete user.verificationToken and user.verificationTokenExpiresAt from the database
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;

    //adding user to the database
    await user.save();

    //send a welcome email
    await sendWelcomeEmail(user.email, user.name);
    res.status(200).json({
      success: true, 
      message: 'Email verified successfully',
      user: {
        ...user._doc,
        password: undefined,
      }
    });
  } catch (err) {
    res.status(500).json({success: false, message: 'Internal Server error'});
    console.log(err);
  } 
}

export const signin = async (req, res) =>{
  const {email, password} = req.body;
  try {
    const user = await User.findOne({email});
    if(!user){
      return res.status(400).json({success: false, message: 'Invalid credentials'});
    }

    //Check if the user password matches the password in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
      return res.status(400).json({success: false, message: 'Invalid credentials'});
    }

    generateTokenAndSetCookie(res, user._id);

    user.lastLogin = new Date();

    await user.save();

    res.status(200).json({
      success: true,
      message: 'User signed in successfully',
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    console.log('Error in signin function',error);
    res.status(500).json({success: false, message: error.message});
  }
}

export const signout = async (req, res) =>{
  res.clearCookie('token');
  res.status(200).json({success: true, message: 'User signed out successfully'});
}

export const forgotPassword = async (req, res) =>{
  const { email } = req.body; 
  try {
    const  user = await User.findOne({email});
    if(!user){
      return res.status(400).json({success: false, message: 'Invalid credentials'});
    }

    //generate a password reset token
    const resetToken = crypto.randomBytes(20).toString('hex');
    const resetTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000; // 1 hour

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpiresAt = resetTokenExpiresAt;

    await user.save();

    //send a password reset email
    await sendPasswordResetEmail(user.email,`${process.env.CLIENT_URL}/reset-password/${resetToken}`);

    res.status(200).json({success: true, message: 'Password reset email sent successfully'});
  } catch (error) {
    console.log('Error in forgotPassword function',error);
    res.status(500).json({success: false, message: error.message});
  }
}

export const resetPassword = async (req, res) =>{
  try {
    const {token} = req.params;
    const {password} = req.body;

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpiresAt: {$gt: Date.now()}
    });
    if(!user){
      return res.status(400).json({success: false, message: 'Invalid or expired password reset token'});
    }

    //update the user password
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiresAt = undefined;

    await user.save();

    //send a password reset successful email
    sendResetSuccessEmail(user.email);

    res.status(200).json({success: true, message: 'Password reset successfully'});
  } catch (error) {
    console.log('Error in resetPassword function',error);
    res.status(400).json({success: false, message: error.message});
    
  }
}

export const checkAuth = async (req, res) => {
  try{
    const user = await User.findById(req.userId).select('-password');
    if(!user){
      return res.status(400).json({success: false, message: 'User not found'});
    }

    res.status(200).json({success: true, user});
  }catch(e) {
    console.log('Error in checkAuth function',e);
    res.status(500).json({success: false, message: e.message});
  }
}