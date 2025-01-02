import User from '../models/userModel.js';
import bcrypt from 'bcrypt';
import {messageHandler} from '../utils/messageHandlerUtils.js';
import {validateName} from '../utils/functionUtils.js';
import {generateTokenAndSetCookie} from '../utils/generateTokenAndSetCookieUtils.js';

export const signUpUser = async (req, res) => {
   const {email, password, username} = req.body;
   try {
      if (!email) {
         return messageHandler(res, 'Email is required!', false, 400);
      }
      if (!username) {
         return messageHandler(res, 'Username is required!', false, 400);
      }
      if (!password) {
         return messageHandler(res, 'Password is required!', false, 400);
      }
      if (password.length < 8) {
         return messageHandler(res, 'Password must be at least 8 characters!', false, 406);
      }
      if (!validateName(username)) {
         return messageHandler(res, 'Enter your first and last name!', false, 406);
      }
      const userAlreadyExists = await User.findOne({email});
      if (userAlreadyExists) {
         return messageHandler(res, 'Email already exists!', false, 400);
      }

      const user = new User({ email, username, password });
      await user.save();

      return messageHandler(res, 'Signed up successfully!', true, 201);

   } catch (err) {
      console.error("Error signing up user: ", err.message);
      return messageHandler(res, err.message, false, 500);
   }
}//end of signUpUser Function

export const signInUser = async (req, res) => {
   const { email, password } = req.body;
   if (!email) {
      return messageHandler(res, 'Email is required!', false, 400);
   }
   if (!password) {
      return messageHandler(res, 'Password is required!', false, 400);
   }

   try {
      const user = await User.findOne({email});
      if (!user) {
         return messageHandler(res, 'Invalid credentials!', false, 403);
      }

      const validPassword = await user.comparePassword(password);
      if (!validPassword) {
         return messageHandler(res, 'Invalid credentials!', false, 401);
      }

      const token = generateTokenAndSetCookie(res, user._id);

      res.status(200).send({
         message: 'Signed in successfully!',
         token: token,
         user: {
            _id: user._id,
            email: user.email,
            username: user.username,
            role: user.role,
            profileImage: user.profileImage,
            bio: user.bio,
            profession: user.profession,
         },
      });
   } catch (err) {
      console.error('User signing in error: ', err.message);
      return messageHandler(res, err.message, false, 500);
   }
}//end of signInUser Function

export const signOutUser = async (req, res) => {
   res.clearCookie("token");
   return messageHandler(res, 'Signed out successfully!', true, 200);

}//end of signOutUser Function

export const deleteUser = async (req, res) => {
   const {id} = req.params;
   if (!id) {
      return messageHandler(res, `Failed Cast to ObjectId for value - ${id}`, false, 406);
   }
   try {
      const userToBeDeleted = await User.findByIdAndDelete(id);
      if (!userToBeDeleted) {
         return messageHandler(res, 'User not found!', false, 404);
      }

      return messageHandler(res, 'User deleted successfully!', true, 200);

   } catch (err) {
      console.error("Error deleting user: ", err.message);
      return messageHandler(res, err.message, false, 500);
   }

}//end of deleteUser Function

export const getAllUsers = async (req, res) => {
   try {
      const users = await User.find({}, "id email role").sort({ createdAt: -1 });
      const count = users.length;


      res.status(200).send({
         message: 'Users found successfully!',
         count: count,
         users: users,
      });
   } catch (error) {
      console.error("Error fetching users", error);
      res.status(500).send({message: "Error fetching user"});
   }
}//end of getAllUsers Function

export const updateUserProfile = async (req, res) => {
   const { userId, username, profileImage, bio, profession } = req.body;
   try {
      if (!userId) {
         return messageHandler(res, 'User ID is required!', false, 400);
      }
      const user = await User.findById(userId);

      if (!user) {
         return messageHandler(res, 'User not found!', false, 404);
      }

      /************************* update user profile *************************/

      if (username !== undefined) {
         if (!validateName(username)) {
            return messageHandler(res, 'Enter your first and last name!', false, 406);
         }
         user.username = username;
      }
      if (profileImage !== undefined) {
         user.profileImage = profileImage;
      }
      if (bio !== undefined) {
         user.bio = bio;
      }
      if (profession !== undefined) {
         user.profession = profession;
      }

      await user.save();
      res.status(200).send({
         message: "Profile updated successfully",
         user: {
            _id: user._id,
            username: user.username,
            email: user.email,
            profileImage: user.profileImage,
            bio: user.bio,
            profession: user.profession,
            role: user.role,
         },
      });

   } catch (err) {
      console.error("Error updating user profile", err.message);
      return messageHandler(res, `Error updating user profile: ${err.message}`, false, 500);
   }

}//end of updateUserProfile Funciton

export const updateUserRole = async (req, res) => {
   const {id} = req.params;
   const {role} = req.body;

   try {
      const user = await User.findByIdAndUpdate(id, { role }, { new: true });
      if (!user) {
         return messageHandler(res, 'User not found!', false, 404);
      }
      res.status(200).send({ message: "User role updated successfully", success: true, user });

   } catch (err) {
      console.error("Error updating user role:", err.message);
      return messageHandler(res, err.message, false, 500);
   }

}//end of updateUserRole Function