import express from 'express';
import {signInUser, signOutUser, signUpUser, deleteUser, getAllUsers, updateUserProfile, updateUserRole} from '../controllers/userControllers.js';

const router = express.Router();

router.post('/sign-up', signUpUser);
router.post('/sign-in', signInUser);
router.post('/sign-out', signOutUser);
router.patch('/update-user-profile', updateUserProfile);
router.put('/update-user-role/:id', updateUserRole);
router.delete('/delete-user/:id', deleteUser);
router.get('/get-all-users', getAllUsers);

export default router;