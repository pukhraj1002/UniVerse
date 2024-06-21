// Import necessary components and hooks from Material-UI and other modules
import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import Navbar from "scenes/navbar";
import UserWidget from "scenes/widgets/UserWidget";
import MyPostWidget from "scenes/widgets/MyPostWidget";
import PostsWidget from "scenes/widgets/PostsWidget";
import AdvertWidget from "scenes/widgets/AdvertWidget";
import FriendListWidget from "scenes/widgets/FriendListWidget";

// Define the HomePage component
const HomePage = () => {
  // Use the `useMediaQuery` hook to determine if the screen is non-mobile (min-width: 1000px)
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  // Get user data (user ID and profile picture path) from the Redux store using `useSelector` hook
  const { _id, picturePath } = useSelector((state) => state.user);

  // Return the JSX for rendering the HomePage component
  return (
    <Box>
      {/* Render the Navbar component */}
      <Navbar />
      {/* Create a Box container for the main content */}
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        {/* Left Column: User Widget */}
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget userId={_id} picturePath={picturePath} />
        </Box>
        {/* Middle Column: MyPostWidget and PostsWidget */}
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <MyPostWidget picturePath={picturePath} />
          <PostsWidget userId={_id} />
        </Box>
        {/* Right Column: AdvertWidget and FriendListWidget */}
        {/* Render the Right Column only for non-mobile screens */}
        {isNonMobileScreens && (
          <Box flexBasis="26%">
            <AdvertWidget />
            <Box m="2rem 0" />
            <FriendListWidget userId={_id} />
          </Box>
        )}
      </Box>
    </Box>
  );
};

// Export the HomePage component as the default export
export default HomePage;






/*
Here's the explanation of each section:

    Import necessary components and hooks from Material-UI and other modules.

    Define the HomePage component. This component is responsible for rendering the main content of the home page.

    Use the useMediaQuery hook to determine if the screen is non-mobile (min-width: 1000px). The result is stored in the isNonMobileScreens variable.

    Use the useSelector hook to access user data from the Redux store. The user object contains the user ID (_id) and the profile picture path (picturePath).

    The component returns JSX elements for rendering the home page content.

    Render the Navbar component at the top of the page.

    Create a Box container for the main content of the page. It sets width, padding, display, gap, and justifyContent properties.

    The main content is divided into three columns:

        Left Column: Renders the UserWidget component. It passes the user ID and profile picture path as props.

        Middle Column: Renders the MyPostWidget and PostsWidget components. The MyPostWidget displays the user's own posts and passes the profile picture path as a prop. The PostsWidget displays posts from all users and passes the user ID as a prop.

        Right Column: Renders the AdvertWidget and FriendListWidget components. This column is only rendered for non-mobile screens (desktop view). The AdvertWidget displays advertisements, and the FriendListWidget displays the user's friends. Both components receive the user ID as a prop.

    The component is exported as the default export for use in other parts of the application.
*/