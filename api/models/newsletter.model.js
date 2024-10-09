import mongoose from "mongoose";

const newsletterSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true, // Ensures that each email is only subscribed once
      match: [/.+@.+\..+/, "Please enter a valid email address"], // Validates email format
    },
    
    subscriptionStatus: {
      type: Boolean,
      default: true, // Indicates if the user is currently subscribed
    },

    token: {
      type: String, 
      required: true, // Token for subscription confirmation or unsubscription
    },
    
    confirmed: {
      type: Boolean,
      default: false, // Status for whether the user has confirmed their subscription
    },
  },
  { timestamps: true } // Adds createdAt and updatedAt fields automatically
);

const Newsletter = mongoose.model("Newsletter", newsletterSchema);

export default Newsletter;
