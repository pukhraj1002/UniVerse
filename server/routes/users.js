// Import the express package to create the router
import express from "express";

// Import the user-related functions from the users.js controller
import { getUser, getUserFriends, addRemoveFriend } from "../controllers/users.js";

// Import the verifyToken function from the auth.js middleware
import { verifyToken } from "../middleware/auth.js";

// Create an instance of express Router to define routes
const router = express.Router();

/* READ */
// Define a route to get a specific user's information
// The route path is "/:id", where ":id" is a route parameter representing the user's ID
// The "verifyToken" middleware is used to authenticate the user
// The "getUser" function from the "users.js" controller is used to handle this route
router.get("/:id", verifyToken, getUser);

// Define a route to get a specific user's friends
// The route path is "/:id/friends", where ":id" is a route parameter representing the user's ID
// The "verifyToken" middleware is used to authenticate the user
// The "getUserFriends" function from the "users.js" controller is used to handle this route
router.get("/:id/friends", verifyToken, getUserFriends);

/* UPDATE */
// Define a route to add or remove a friend for a user
// The route path is "/:id/:friendId", where ":id" and ":friendId" are route parameters representing the user's ID and friend's ID respectively
// The "verifyToken" middleware is used to authenticate the user
// The "addRemoveFriend" function from the "users.js" controller is used to handle this route
router.patch("/:id/:friendId", verifyToken, addRemoveFriend);

// Export the router to be used in other parts of the application
export default router;




/*
1. Import the express package, which allows us to create a server and define routes.

2. Import the user-related functions (getUser, getUserFriends, and addRemoveFriend) from the users.js controller. These functions handle different operations related to users.

3. Import the verifyToken function from the auth.js middleware. This function is used to verify the authenticity of the user by checking the validity of the JWT token in the request header.

4. Create an instance of express.Router(). The Router class allows us to define routes separately and then combine them into the main application.

10-13. Define a route to read (retrieve) a specific user's information. The path for this route is "/:id", where :id is a route parameter representing the user's ID. The verifyToken middleware is used to authenticate the user. The getUser function from the users.js controller is used to handle this route.

16-19. Define a route to read (retrieve) a specific user's friends. The path for this route is "/:id/friends", where :id is a route parameter representing the user's ID. The verifyToken middleware is used to authenticate the user. The getUserFriends function from the users.js controller is used to handle this route.

22-25. Define a route to update (add/remove) a friend for a user. The path for this route is "/:id/:friendId", where :id and :friendId are route parameters representing the user's ID and friend's ID, respectively. The verifyToken middleware is used to authenticate the user. The addRemoveFriend function from the users.js controller is used to handle this route.

5. Export the router to be used in other parts of the application, such as in the main server file (app.js) where we will combine all the defined routes. This allows us to keep our code organized and modular.
*/