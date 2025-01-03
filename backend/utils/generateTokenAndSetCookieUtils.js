import jwt from 'jsonwebtoken';

export const generateTokenAndSetCookie = (res, userId) => {
   // Get the expiration time from the environment variable and ensure it's a valid number
   const cookieExpiresIn = parseInt(process.env.COOKIE_EXPIRES_TIME) || 24; // Default to 24 hours if not set
   const expiresIn = `${cookieExpiresIn}h`; // e.g., "24h"

   // Generate the JWT token with the userId and expiration time
   const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn, // Use the formatted expiresIn string
   });

   // Set the token in the cookie
   res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Ensure cookie is secure in production
      sameSite: 'strict', // Mitigate CSRF attacks
      maxAge: cookieExpiresIn * 60 * 60 * 1000, // Set cookie max age in milliseconds (24 hours default)
   });

   return token;
};
