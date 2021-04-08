import express from 'express';
const router = express.Router();
import { authUser, deleteUser, getUserProfile, getUsers, registerUser, updateUserProfile,getUserById, updateUser } from '../controller/userController.js';
import { admin, protect } from '../middleware/authMiddleware.js';

router.route('/')
  .post(registerUser)
  .get(protect, admin, getUsers)
router.post('/login', authUser);
router.route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile)
router.route('/:id')
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser)
  .delete(protect, admin, deleteUser)


export default router;