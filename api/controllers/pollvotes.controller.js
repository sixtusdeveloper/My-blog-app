// pollVote.controller.js
import PollVote from '../models/pollvotes.model.js';
import { errorHandler } from '../utils/error.js';

// Fetch the current poll results
export const getPollVotes = async (req, res, next) => {
  try {
    const pollVotes = await PollVote.findOne();
    if (!pollVotes) {
      // If no poll data exists, create it with default values
      const newPoll = new PollVote();
      await newPoll.save();
      return res.json(newPoll);
    }
    res.json(pollVotes);
  } catch (error) {
    next(error);
  }
};

// Submit a vote for a specific framework
export const submitVote = async (req, res, next) => {
  const { framework } = req.body;

  try {
    let pollVotes = await PollVote.findOne();

    if (!pollVotes) {
      pollVotes = new PollVote();
    }

    switch (framework) {
      case 'React':
        pollVotes.reactVotes += 1;
        break;
      case 'Vue':
        pollVotes.vueVotes += 1;
        break;
      case 'Angular':
        pollVotes.angularVotes += 1;
        break;
      default:
        return next(errorHandler(400, 'Invalid framework'));
    }

    await pollVotes.save();
    res.json(pollVotes);
  } catch (error) {
    next(error);
  }
};

// Reset the poll data
// Reset votes for a specific framework
export const resetPollVotes = async (req, res, next) => {
  const { framework } = req.body; // Get the framework from the request

  try {
    const pollVotes = await PollVote.findOne();
    if (pollVotes) {
      switch (framework) {
        case 'React':
          pollVotes.reactVotes = 0;
          break;
        case 'Vue':
          pollVotes.vueVotes = 0;
          break;
        case 'Angular':
          pollVotes.angularVotes = 0;
          break;
        default:
          return next(errorHandler(400, 'Invalid framework'));
      }
      await pollVotes.save();
      res.json(`Votes for ${framework} reset successfully`);
    } else {
      res.status(404).json('No poll data found');
    }
  } catch (error) {
    next(error);
  }
};

// export const resetPollVotes = async (req, res, next) => {
//   try {
//     const pollVotes = await PollVote.findOne();
//     if (pollVotes) {
//       pollVotes.reactVotes = 0;
//       pollVotes.vueVotes = 0;
//       pollVotes.angularVotes = 0;
//       await pollVotes.save();
//     }
//     res.json('Poll data reset successfully');
//   } catch (error) {
//     next(error);
//   }
// };
