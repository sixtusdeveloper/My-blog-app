// pollVote.model.js
import mongoose from "mongoose";

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

  nextjsVotes: {
    type: Number,
    default: 0,
  },

  svelteVotes: {
    type: Number,
    default: 0,
  },

  typescriptVotes: {
    type: Number,
    default: 0,
  },

  expressVotes: {
    type: Number,
    default: 0,
  },

  mongodbVotes: {
    type: Number,
    default: 0,
  },

  laravelVotes: {
    type: Number,
    default: 0,
  },

  postgresqlVotes: {
    type: Number,
    default: 0,
  },

  djangoVotes: {
    type: Number,
    default: 0,
  },

  flaskVotes: {
    type: Number,
    default: 0,
  },

  mysqlVotes: {
    type: Number,
    default: 0,
  },

  bootstrapVotes: {
    type: Number,
    default: 0,
  },

  tailwindcssVotes: {
    type: Number,
    default: 0,
  },

  materialuiVotes: {
    type: Number,
    default: 0,
  },

  chakrauiVotes: {
    type: Number,
    default: 0,
  },

  shadcnVotes: {
    type: Number,
    default: 0,
  },

  graphqlVotes: {
    type: Number,
    default: 0,
  },

  dockerVotes: {
    type: Number,
    default: 0,
  },

  kubernetesVotes: {
    type: Number,
    default: 0,
  },
});

const PollVote = mongoose.model("PollVote", pollVoteSchema);

export default PollVote;
