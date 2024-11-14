import jwt from 'jsonwebtoken';

//generate verification token
export const generateVerificationToken = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

//jwt token generation and setting in cookie
export const generateTokenAndSetCookie = (res, userId) => {
  const token = jwt.sign({userId}, process.env.JWT_SECRET_KEY, {
    expiresIn: '7d',
  })
  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',// prevents an attack called cross-site request forgery (CSRF)
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
  })

  return token;
}