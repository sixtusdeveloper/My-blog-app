import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import {
  createNotification,
  getNotifications,
  deleteNotifications,
  markNotificationAsRead
} from '../controllers/notification.controller.js';
import { getUser } from '../controllers/user.controller.js'; // Import getUser function from user controller

const router = express.Router();

router.post('/create', verifyToken, createNotification);
router.get('/getnotifications', verifyToken, getNotifications);
router.delete('/deletenotifications/:notificationId', verifyToken, deleteNotifications);
router.patch('/markAsRead/:notificationId', verifyToken, markNotificationAsRead);

// New route to get user details
router.get('/user', verifyToken, getUser); 

export default router;
