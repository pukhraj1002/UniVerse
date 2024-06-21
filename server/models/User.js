// Import the mongoose package
import mongoose from "mongoose";

// Define the schema for the "User" collection in the database
const UserSchema = new mongoose.Schema(
  {
    // Field for the user's first name
    firstName: {
      type: String,
      required: true,
      min: 2, // Minimum length of 2 characters allowed
      max: 50, // Maximum length of 50 characters allowed
    },
    // Field for the user's last name
    lastName: {
      type: String,
      required: true,
      min: 2, // Minimum length of 2 characters allowed
      max: 50, // Maximum length of 50 characters allowed
    },
    // Field for the user's email address
    email: {
      type: String,
      required: true,
      max: 50, // Maximum length of 50 characters allowed
      unique: true, // Email must be unique in the collection
    },
    // Field for the user's password (hashed and stored securely)
    password: {
      type: String,
      required: true,
      min: 5, // Minimum length of 5 characters allowed
    },
    // Field for the file path of the user's profile picture
    picturePath: {
      type: String,
      default: "", // Default value is an empty string
    },
    // Field for an array of user IDs representing the user's friends
    friends: {
      type: Array,
      default: [], // Default value is an empty array
    },
    // Field for the user's location
    location: String,
    // Field for the user's occupation
    occupation: String,
    // Field for the number of times the user's profile has been viewed
    viewedProfile: Number,
    // Field for the number of impressions (interactions/views) on the user's posts or profile
    impressions: Number,
  },
  // Options for the schema
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Create the "User" model based on the defined schema
const User = mongoose.model("User", UserSchema);

// Export the "User" model
export default User;



/*
1. Import the mongoose package to interact with MongoDB and define schemas/models.

3-26. Define the UserSchema using mongoose.Schema(). This schema represents the structure of the "User" collection in the MongoDB database. It contains various fields for user data such as first name, last name, email, password, profile picture, friends, location, occupation, viewed profile count, and impression count.

2. Create the "User" model using mongoose.model(), which links the schema to the "User" collection in the MongoDB database.

3. Export the "User" model to be used in other parts of the application, such as route handlers and controllers.
*/