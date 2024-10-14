// contact.route.js
import express from 'express';
import { createContact, getContacts } from '../controllers/contact.controller.js'; // Ensure this matches the exports in the controller
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

// POST /api/contact
router.post('/contact', verifyToken, createContact); // Updated to use createContact
router.get('/contact', getContacts); // Optional: Handle GET request to retrieve contacts

export default router;
