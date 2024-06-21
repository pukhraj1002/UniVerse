// Import the express package to create the router
import express from "express";

// Import the login function from the auth.js controller
import { login } from "../controllers/auth.js";

// Create an instance of express Router to define routes
const router = express.Router();

// Define a route for handling the login request
router.post("/login", login);

// Export the router to be used in other parts of the application
export default router;




/*
1. Import the express package, which allows us to create a server and define routes.

2. Import the login function from the auth.js controller. This function handles the logic for user login.

3. Create an instance of express.Router(). The Router class allows us to define routes separately and then combine them into the main application.

4. Define a route using the post() method for handling the login request. The path for this route is "/login" and it will be used to handle HTTP POST requests.

5. Attach the login function to the /login route. When a POST request is made to /login, the login function from the auth.js controller will be executed to handle the login process.

6. Export the router to be used in other parts of the application, such as in the main server file (app.js) where we will combine all the defined routes. This allows us to keep our code organized and modular.
*/