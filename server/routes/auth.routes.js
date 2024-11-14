import express from 'express';

import { verifyToken } from '../middlewares/verifyToken.js';
import { signup, signin, signout, verifyEmail, forgotPassword, resetPassword, checkAuth } from '../controllers/auth.controller.js';

const router = express.Router();

router.get('/check-auth', verifyToken, checkAuth);

router.post('/signup', signup);
router.post('/signin',signin);
router.post('/signout', signout);

router.post('/verify-email', verifyEmail);
router.post('/forgot-password', forgotPassword);
router.put('/reset-password/:token', resetPassword);


export default router;