import Post from "../models/Post.js";
import User from "../models/User.js";

/* CREATE */
export const createPost = async (req, res) => {
  try {
    // Extract data from the request body
    const { userId, description, picturePath } = req.body;
    
    // Find the user in the database using the provided userId
    const user = await User.findById(userId);
    
    // Create a new Post instance with the extracted data and additional user details
    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      userPicturePath: user.picturePath,
      picturePath,
      likes: {},
      comments: [],
    });
    
    // Save the new post to the database
    await newPost.save();

    // Retrieve all posts from the database
    const post = await Post.find();
    
    // Send the updated list of posts as a response with status 201 (Created)
    res.status(201).json(post);
  } catch (err) {
    // If any error occurs during post creation, send a 409 (Conflict) response with an error message
    res.status(409).json({ message: err.message });
  }
};

/* READ */
export const getFeedPosts = async (req, res) => {
  try {
    // Retrieve all posts from the database
    const post = await Post.find();
    
    // Send the list of posts as a response with status 200 (OK)
    res.status(200).json(post);
  } catch (err) {
    // If any error occurs while fetching posts, send a 404 (Not Found) response with an error message
    res.status(404).json({ message: err.message });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    // Extract userId from the request parameters
    const { userId } = req.params;
    
    // Retrieve posts from the database associated with the provided userId
    const post = await Post.find({ userId });
    
    // Send the list of user-specific posts as a response with status 200 (OK)
    res.status(200).json(post);
  } catch (err) {
    // If any error occurs while fetching user-specific posts, send a 404 (Not Found) response with an error message
    res.status(404).json({ message: err.message });
  }
};

/* UPDATE */
export const likePost = async (req, res) => {
  try {
    // Extract post id and userId from request parameters and body
    const { id } = req.params;
    const { userId } = req.body;
    
    // Find the post in the database using the provided id
    const post = await Post.findById(id);
    
    // Check if the user has already liked the post
    const isLiked = post.likes.get(userId);

    // If the user has already liked the post, remove the like; otherwise, add the like
    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }

    // Update the post with the modified like data in the database
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );

    // Send the updated post as a response with status 200 (OK)
    res.status(200).json(updatedPost);
  } catch (err) {
    // If any error occurs during post like update, send a 404 (Not Found) response with an error message
    res.status(404).json({ message: err.message });
  }
};





/*    
1. createPost: This function is responsible for creating a new post. It extracts the required data from the request body, finds the user associated with the provided userId, creates a new Post instance with the necessary details, and saves it to the database. Afterward, it retrieves all posts from the database and sends the updated list as a response.

2. getFeedPosts: This function fetches all posts from the database to create a feed of posts. It simply retrieves all posts from the database and sends the list as a response.

3. getUserPosts: This function fetches posts specific to a given user. It extracts the userId from the request parameters, queries the database for posts associated with that userId, and sends the list of user-specific posts as a response.

4. likePost: This function handles the liking of a post. It takes the post id from the request parameters and the user id from the request body. It finds the post in the database, checks if the user has already liked the post, and accordingly adds or removes the like. It then updates the post with the modified like data and sends the updated post as a response.*/