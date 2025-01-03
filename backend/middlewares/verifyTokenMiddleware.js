import jwt from 'jsonwebtoken';
import { messageHandler } from '../utils/messageHandlerUtils.js';
import User from '../models/userModel.js';

export const verifyToken = async (req, res, next) => {
   try {
      // Retrieve the token from cookies
      const { token } = req.cookies;
      if (!token) {
         return messageHandler(res, 'Unauthorized - Sign in to access this resource!', false, 401);
      }

      // Verify the token using JWT
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (!decoded) {
         return messageHandler(res, 'Unauthorized - Invalid Token!', false, 403);
      }

      // Fetch the user details from the database based on the decoded userId
      req.user = await User.findOne({ _id: decoded.userId });
      if (!req.user) {
         return messageHandler(res, 'User not found!', false, 404);
      }

      // Attach user data to the request object for use in the next middleware/route handler
      req.userId = req.user._id;
      req.role = req.user.role;

      // Call the next middleware or route handler
      next();

   } catch (err) {
      // Log detailed error message for debugging
      console.error(`Error verifying token: ${err.message}`);
      return messageHandler(res, 'Token verification failed!', false, 401);
   }
};

export default verifyToken;
