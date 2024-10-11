// pollVote.routes.js
import express from 'express';
import { getPollVotes, submitVote, resetPollVotes } from '../controllers/pollvotes.controller.js';

const router = express.Router();

// Route to get the current poll votes
router.get('/', getPollVotes);

// Route to submit a vote
router.post('/vote', submitVote);

// Route to reset poll votes
router.post('/reset', resetPollVotes);

export default router;
