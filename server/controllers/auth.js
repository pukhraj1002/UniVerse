// Import necessary packages and modules
import bcrypt from "bcrypt"; // Bcrypt is used for password hashing
import jwt from "jsonwebtoken"; // JSON Web Tokens for authentication
import User from "../models/User.js"; // Importing the User model to interact with the database

/* REGISTER USER */
export const register = async (req, res) => {
  try {
    // Extract user data from the request body
    const {
      firstName,
      lastName,
      email,
      password,
      picturePath,
      friends,
      location,
      occupation,
    } = req.body;

    // Generate a salt for password hashing using bcrypt
    const salt = await bcrypt.genSalt();
    // Hash the password using bcrypt and the generated salt
    const passwordHash = await bcrypt.hash(password, salt);

    // Create a new User instance with the hashed password and other details
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      picturePath,
      friends,
      location,
      occupation,
      viewedProfile: Math.floor(Math.random() * 10000), // Generate random viewedProfile value
      impressions: Math.floor(Math.random() * 10000), // Generate random impressions value
    });
    
    // Save the new user to the database
    const savedUser = await newUser.save();
    
    // Send the saved user data as a response with status 201 (Created)
    res.status(201).json(savedUser);
  } catch (err) {
    // If any error occurs during registration, send a 500 (Internal Server Error) response
    res.status(500).json({ error: err.message });
  }
};

/* LOGGING IN */
export const login = async (req, res) => {
  try {
    // Extract email and password from the request body
    const { email, password } = req.body;
    
    // Find the user with the provided email in the database
    const user = await User.findOne({ email: email });
    
    // If no user is found, send a 400 (Bad Request) response with a message
    if (!user) return res.status(400).json({ msg: "User does not exist. " });

    // Compare the provided password with the hashed password in the database using bcrypt
    const isMatch = await bcrypt.compare(password, user.password);
    
    // If the password doesn't match, send a 400 (Bad Request) response with a message
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials. " });

    // If the login is successful, create a JSON Web Token (JWT) containing the user's ID
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    
    // Remove the hashed password from the user object before sending it as a response
    delete user.password;
    
    // Send the token and user data as a response with status 200 (OK)
    res.status(200).json({ token, user });
  } catch (err) {
    // If any error occurs during login, send a 500 (Internal Server Error) response
    res.status(500).json({ error: err.message });
  }
};




/*
1. register: This function handles user registration. It takes user data from the request body, hashes the provided password using bcrypt, creates a new User instance with the hashed password, and saves it to the database. After successful registration, it sends the saved user data as a response with status 201 (Created). If any error occurs during registration, it sends a 500 (Internal Server Error) response.

2. login: This function handles user login. It extracts the email and password from the request body, finds the user with the provided email in the database, and compares the provided password with the hashed password stored in the database using bcrypt. If the login is successful, it creates a JSON Web Token (JWT) containing the user's ID, removes the hashed password from the user object, and sends the JWT and user data as a response with status 200 (OK). If the login fails (e.g., invalid email or password), it sends a 400 (Bad Request) response with an appropriate message. If any error occurs during login, it sends a 500 (Internal Server Error) response.
*/