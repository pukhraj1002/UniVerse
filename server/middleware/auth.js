// Import the jwt package
import jwt from "jsonwebtoken";

// Middleware function to verify the JWT token
export const verifyToken = async (req, res, next) => {
  try {
    // Get the token from the "Authorization" header in the request
    let token = req.header("Authorization");

    // If no token is provided, return a 403 (Forbidden) response with "Access Denied" message
    if (!token) {
      return res.status(403).send("Access Denied");
    }

    // If the token starts with "Bearer ", remove that part to extract the actual token
    
    //Bearer strings are often associated with the OAuth 2.0 authentication framework, where they play a crucial role in securing API requests. When a user or application wants to access a protected resource or perform certain actions on behalf of a user, they first need to obtain an access token. This access token is the bearer string.
    
    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length).trimLeft();
    }

    // Verify the JWT token using the provided JWT secret
    const verified = jwt.verify(token, process.env.JWT_SECRET);

    // If the token is successfully verified, attach the verified user data to the request object
    // This allows other middleware or route handlers to access the user data from the request object
    req.user = verified;

    // Call the "next" function to continue processing the request
    next();
  } catch (err) {
    // If any error occurs during token verification, send a 500 (Internal Server Error) response with the error message
    res.status(500).json({ error: err.message });
  }
};



/*
The purpose of this verifyToken middleware function is to verify the JSON Web Token (JWT) provided in the request and attach the decoded user data to the request object (req.user). This middleware function is typically used in routes or endpoints that require authentication.
*/