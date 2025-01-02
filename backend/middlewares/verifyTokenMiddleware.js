import jwt from 'jsonwebtoken';
import {messageHandler} from '../utils/messageHandlerUtils.js';
import User from '../models/userModel.js';


export const verifyToken = async (req, res, next) => {
   try {
      const {token}= req.cookies;
      if(!token) {
         return messageHandler(res, 'Unauthorized - Sign in to access this resource!', false, 401);
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if(!decoded){
         return messageHandler(res, 'Unauthorized - Invalid Token!', false, 403);
      }

      req.user = await User.findOne({_id: decoded.userId});
      req.userId = req.user._id;
      req.role = req.user.role;

      next();

   } catch (err) {
      console.error('Error verifying token', err.message);
      return messageHandler(res, err.message, false, 401);
   }
}

export default verifyToken;