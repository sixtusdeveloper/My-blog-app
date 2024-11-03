import express from 'express'; 
import { verifyToken } from '../utils/verifyUser.js';
import { createNotification, getNotifications, deleteNotification, markNotificationAsRead } from '../controllers/notification.controller.js';

const router = express.Router();

router.post('/create', verifyToken, createNotification);
router.get('/getnotifications', verifyToken, getNotifications); // Consider adding pagination or filters
router.delete('/deletenotification/:notificationId', verifyToken, deleteNotification); // Removed userId as it's not needed
router.patch('/markAsRead/:notificationId', verifyToken, markNotificationAsRead); // Change this line to PATCH

export default router;
