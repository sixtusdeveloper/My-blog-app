import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { createNotification, getNotifications, deleteNotification } from '../controllers/notification.controller.js';

const router = express.Router();

router.post('/create', verifyToken, createNotification);
router.get('/getnotifications', verifyToken, getNotifications);
router.delete('/deletenotification/:notificationId/:userId', verifyToken, deleteNotification);

export default router;
