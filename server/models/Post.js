// Import the mongoose package
import mongoose from "mongoose";

// Define the schema for the "Post" collection in the database
const postSchema = mongoose.Schema(
  {
    // Field for the user ID who created the post
    userId: {
      type: String,
      required: true,
    },
    // First name of the user who created the post
    firstName: {
      type: String,
      required: true,
    },
    // Last name of the user who created the post
    lastName: {
      type: String,
      required: true,
    },
    // Location of the user who created the post
    location: String,
    // Description of the post
    description: String,
    // File path of the picture associated with the post
    picturePath: String,
    // File path of the user's profile picture who created the post
    userPicturePath: String,
    // Map of user IDs to boolean values representing likes
    likes: {
      type: Map,
      of: Boolean,
    },
    // Array containing comments associated with the post
    comments: {
      type: Array,
      default: [],
    },
  },
  // Options for the schema
  { timestamps: true }
);

// Create the "Post" model based on the defined schema
const Post = mongoose.model("Post", postSchema);

// Export the "Post" model
export default Post;




/*
1. Import the mongoose package to interact with MongoDB and define schemas/models.

2. Define the postSchema using mongoose.Schema(). This schema will represent the structure of the "Post" collection in the MongoDB database.

5-12. Define the fields of the schema with their respective data types and properties. The fields represent different attributes of a post, such as the user ID of the creator, first name, last name, location, description, picture paths, likes, and comments.

3. The timestamps option is set to true, which automatically adds createdAt and updatedAt fields to the documents. These fields store the creation and last update timestamps of each post.

4. Create the "Post" model using mongoose.model(), which links the schema to the "Post" collection in the MongoDB database.

5. Export the "Post" model to be used in other parts of the application, such as route handlers and controllers.


*/