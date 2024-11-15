// pollVote.controller.js
import PollVote from "../models/pollvotes.model.js";
import { errorHandler } from "../utils/error.js";

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
      case "React":
        pollVotes.reactVotes += 1;
        break;
      case "Vue":
        pollVotes.vueVotes += 1;
        break;
      case "Angular":
        pollVotes.angularVotes += 1;
        break;
      case "Nextjs":
        pollVotes.nextjsVotes += 1;
        break;
      case "Svelte":
        pollVotes.svelteVotes += 1;
        break;
      case "TypeScript":
        pollVotes.typescriptVotes += 1;
        break;
      case "Express":
        pollVotes.expressVotes += 1;
        break;
      case "MongoDB":
        pollVotes.mongodbVotes += 1;
        break;
      case "Laravel":
        pollVotes.laravelVotes += 1;
        break;
      case " PostgreSQL":
        pollVotes.postgresqlVotes += 1;
        break;
      case "Django":
        pollVotes.djangoVotes += 1;
        break;
      case "Flask":
        pollVotes.flaskVotes += 1;
        break;
      case "MySQL":
        pollVotes.mysqlVotes += 1;
        break;
      case "Bootstrap":
        pollVotes.bootstrapVotes += 1;
        break;
      case "TailwindCSS":
        pollVotes.tailwindcssVotes += 1;
        break;
      case "MaterialUI":
        pollVotes.materialuiVotes += 1;
        break;
      case "ChakraUI":
        pollVotes.chakrauiVotes += 1;
        break;
      case "Shadcn":
        pollVotes.shadcnVotes += 1;
        break;
      case "GraphQL":
        pollVotes.graphqlVotes += 1;
        break;
      case "Docker":
        pollVotes.dockerVotes += 1;
        break;
      case "Kubernetes":
        pollVotes.kubernetesVotes += 1;
        break;

      default:
        return next(errorHandler(400, "Invalid framework"));
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
        case "React":
          pollVotes.reactVotes = 0;
          break;
        case "Vue":
          pollVotes.vueVotes = 0;
          break;
        case "Angular":
          pollVotes.angularVotes = 0;
          break;
        case "Nextjs":
          pollVotes.nextjsVotes = 0;
          break;
        case "Svelte":
          pollVotes.svelteVotes = 0;
          break;
        case "TypeScript":
          pollVotes.typescriptVotes = 0;
          break;
        case "Express":
          pollVotes.expressVotes = 0;
          break;
        case "MongoDB":
          pollVotes.mongodbVotes = 0;
          break;
        case "Laravel":
          pollVotes.laravelVotes = 0;
          break;
        case " PostgreSQL":
          pollVotes.postgresqlVotes = 0;
          break;
        case "Django":
          pollVotes.djangoVotes = 0;
          break;
        case "Flask":
          pollVotes.flaskVotes = 0;
          break;
        case "MySQL":
          pollVotes.mysqlVotes = 0;
          break;
        case "Bootstrap":
          pollVotes.bootstrapVotes = 0;
          break;
        case "TailwindCSS":
          pollVotes.tailwindcssVotes = 0;
          break;
        case "MaterialUI":
          pollVotes.materialuiVotes = 0;
          break;
        case "ChakraUI":
          pollVotes.chakrauiVotes = 0;
          break;
        case "Shadcn":
          pollVotes.shadcnVotes = 0;
          break;
        case "GraphQL":
          pollVotes.graphqlVotes = 0;
          break;
        case "Docker":
          pollVotes.dockerVotes = 0;
          break;
        case "Kubernetes":
          pollVotes.kubernetesVotes = 0;
          break;
        default:
          return next(errorHandler(400, "Invalid framework"));
      }
      await pollVotes.save();
      res.json(`Votes for ${framework} reset successfully`);
    } else {
      res.status(404).json("No poll data found");
    }
  } catch (error) {
    next(error);
  }
};
