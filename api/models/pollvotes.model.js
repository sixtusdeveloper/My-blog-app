// pollVote.model.js
import mongoose from 'mongoose';

const pollVoteSchema = new mongoose.Schema({
  reactVotes: {
    type: Number,
    default: 0,
  },
  vueVotes: {
    type: Number,
    default: 0,
  },
  angularVotes: {
    type: Number,
    default: 0,
  },
});

const PollVote = mongoose.model('PollVote', pollVoteSchema);

export default PollVote;
