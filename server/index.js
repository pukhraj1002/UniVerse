import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import { register } from "./controllers/auth.js";
import { createPost } from "./controllers/posts.js";
import { verifyToken } from "./middleware/auth.js";
import User from "./models/User.js";
import Post from "./models/Post.js";
import { users, posts } from "./data/index.js";

/* CONFIGURATIONS */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();

// Parse incoming JSON requests
app.use(express.json());
// Enhance app security with various HTTP headers
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
// HTTP request logger middleware
app.use(morgan("common"));
// Parse incoming requests with urlencoded payloads
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
// Enable Cross-Origin Resource Sharing (CORS)
app.use(cors());
// Serve static files from the 'public/assets' directory under '/assets' route
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

/* FILE STORAGE */
// Configure multer for file storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Specify the destination folder for uploaded files
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    // Specify the filename for uploaded files
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

/* ROUTES WITH FILES */
// Route for user registration with profile picture upload
app.post("/auth/register", upload.single("picture"), register);
// Route for creating posts with attached pictures, requires token verification
app.post("/posts", verifyToken, upload.single("picture"), createPost);

/* ROUTES */
// Register authentication routes
app.use("/auth", authRoutes);
// Register user-related routes
app.use("/users", userRoutes);
// Register post-related routes
app.use("/posts", postRoutes);

/* MONGOOSE SETUP */
// Set up MongoDB connection
const PORT = process.env.PORT || 6001;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    // Start the server once connected to the database
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

    /* ADD DATA ONE TIME */
    // Uncomment the lines below to insert initial data into the User and Post collections
    // User.insertMany(users);
    // Post.insertMany(posts);
  })
  .catch((error) => console.log(`${error} did not connect`));
