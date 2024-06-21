// Import the express package to create the router
import express from "express";

// Import the post-related functions from the posts.js controller
import { getFeedPosts, getUserPosts, likePost } from "../controllers/posts.js";

// Import the verifyToken function from the auth.js middleware
import { verifyToken } from "../middleware/auth.js";

// Create an instance of express Router to define routes
const router = express.Router();

/* READ */
// Define a route to get feed posts
// The route path is "/", and the "verifyToken" middleware is used to authenticate the user
// The "getFeedPosts" function from the "posts.js" controller is used to handle this route
router.get("/", verifyToken, getFeedPosts);

// Define a route to get posts of a specific user
// The route path is "/:userId/posts", and the "verifyToken" middleware is used to authenticate the user
// The "getUserPosts" function from the "posts.js" controller is used to handle this route
router.get("/:userId/posts", verifyToken, getUserPosts);

/* UPDATE */
// Define a route to like/unlike a post
// The route path is "/:id/like", and the "verifyToken" middleware is used to authenticate the user
// The "likePost" function from the "posts.js" controller is used to handle this route
router.patch("/:id/like", verifyToken, likePost);

// Export the router to be used in other parts of the application
export default router;




/*
1. Import the express package, which allows us to create a server and define routes.

2. Import the post-related functions (getFeedPosts, getUserPosts, and likePost) from the posts.js controller. These functions handle different operations related to posts.

3. Import the verifyToken function from the auth.js middleware. This function is used to verify the authenticity of the user by checking the validity of the JWT token in the request header.

4. Create an instance of express.Router(). The Router class allows us to define routes separately and then combine them into the main application.

10-13. Define a route to read (retrieve) feed posts. The path for this route is "/", and the verifyToken middleware is used to authenticate the user. The getFeedPosts function from the posts.js controller is used to handle this route.

16-19. Define a route to read (retrieve) posts of a specific user. The path for this route is "/:userId/posts", where :userId is a route parameter representing the user's ID. The verifyToken middleware is used to authenticate the user. The getUserPosts function from the posts.js controller is used to handle this route.

22-25. Define a route to update (like/unlike) a post. The path for this route is "/:id/like", where :id is a route parameter representing the post's ID. The verifyToken middleware is used to authenticate the user. The likePost function from the posts.js controller is used to handle this route.

5. Export the router to be used in other parts of the application, such as in the main server file (app.js) where we will combine all the defined routes. This allows us to keep our code organized and modular.
*/