import { quotes, users } from "./fakedb.js";
import { randomBytes } from "crypto";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./config.js";
import {ObjectID} from "mongodb";
const User = mongoose.model("User");
const Quote = mongoose.model("Quote");
// const { ObjectID } = require('mongodb');
const resolvers = {
  Query: {
    users: async () => await User.find({}),
    user: async (_, { _id }) => await User.findOne({ _id }),
    quotes: async () => await Quote.find({}).populate("by", "_id firstName"),
    quote: async(_, {_id}) => await Quote.findOne({ _id }),
    iquote: async (_, { by }) => await Quote.find({ by }),  
    myprofile: async (_, args, { userId }) => {
      if (!userId) throw new Error("You must be logged in");
      return await User.findOne({ _id: userId });
    },
    quotesAssignedToUser: async (_, { userId }) => {
      try {
        const quotes = await Quote.find({ assignedTo: userId });
        return quotes;
      } catch (error) {
        console.error(error);
        return [];
      }
    },
  },
  User: {
    quotes: async (ur) => await Quote.find({ by: ur._id }),
  },
  Mutation: {
    signupUser: async (_, { userNew }) => {
      const user = await User.findOne({ email: userNew.email });
      if (user) {
        throw new Error("User already exists with that email");
      }
      const hashedPassword = await bcrypt.hash(userNew.password, 12);

      const newUser = new User({
        ...userNew,
        password: hashedPassword,
        role: userNew.role || "INSPECTOR",
      });
      return await newUser.save();
    },
    signinUser: async (_, { userSignin }) => {3
      const user = await User.findOne({ email: userSignin.email });
      if (!user) {
        throw new Error("User12 dosent exists with that email");
      }
      const doMatch = await bcrypt.compare(userSignin.password, user.password);
      if (!doMatch) {
        throw new Error("email or password in invalid");
      }
      const token = jwt.sign({ userId: user._id }, JWT_SECRET);
      return { token };
    },
    deleteUser: async (_, { userId }) => {
      try {
        // Find the user by ID and deletex
        const deletedUser = await User.findByIdAndDelete(userId);

        if (!deletedUser) {
          throw new Error('User not found');
        }

        return true; // Return true to indicate successful deletion
      } catch (error) {
        console.error('Error deleting user:', error);
        return false; // Return false in case of errors
      }
    },
   
    createQuote: async (_, { quoteNew, assignedToUserId }, { userId }) => {
      const newQuote = new Quote({
        ...quoteNew,
        by: userId,
        assignedTo: assignedToUserId, // Associate the quote with the selected user
      });
      return await newQuote.save();
    },
    
    editQuote: async (_, { quoteId, quoteUpdates }) => {
      try {
        // Check if the provided quoteId is valid
        const quote = await Quote.findById(quoteId);
        if (!quote) {
          throw new Error("Quote not found");
        }

        // Update the quote with the provided updates
        Object.assign(quote, quoteUpdates);
        
        const updatedQuote = await quote.save();
        return updatedQuote;
      } catch (error) {
        console.error(error);
        return null;
      }
    },
    deleteQuote: async (_, { quoteId }) => {
      try {
        // Delete the quote by its ID from the database
        const result = await Quote.findByIdAndDelete(quoteId);
        return result !== null; // Return true if delete was successful, false if not
      } catch (error) {
        console.error(error);
        return false;
      }
    },

  },
};

export default resolvers;
