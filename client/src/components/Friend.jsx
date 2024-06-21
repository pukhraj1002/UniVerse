// Import necessary components and functions from Material-UI and React libraries
import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFriends } from "state";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";

// Friend component definition, receives friendId, name, subtitle, and userPicturePath as props
const Friend = ({ friendId, name, subtitle, userPicturePath }) => {
  // Define necessary hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends);

  // Access theme from Material-UI
  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  // Check if the friend is already in the user's friends list
  const isFriend = friends.find((friend) => friend._id === friendId);

  // Function to patch (update) the friend status by making an API call
  const patchFriend = async () => {
    const response = await fetch(
      `http://localhost:3001/users/${_id}/${friendId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    // Dispatch the updated friends list to the Redux store
    dispatch(setFriends({ friends: data }));
  };

  return (
    // A component that arranges its children in a flex container with space between them
    <FlexBetween>
      {/* Display user image and name */}
      <FlexBetween gap="1rem">
        <UserImage image={userPicturePath} size="55px" />
        <Box
          // Clicking on the user's name will navigate to their profile page
          onClick={() => {
            navigate(`/profile/${friendId}`);
            // Set navigation state to 0 (reset) to avoid back button issues
            navigate(0);
          }}
        >
          <Typography
            color={main}
            variant="h5"
            fontWeight="500"
            sx={{
              "&:hover": {
                color: palette.primary.light,
                cursor: "pointer",
              },
            }}
          >
            {name}
          </Typography>
          <Typography color={medium} fontSize="0.75rem">
            {subtitle}
          </Typography>
        </Box>
      </FlexBetween>
      {/* IconButton to add/remove the friend */}
      <IconButton
        // Clicking on the IconButton will call the patchFriend function to update the friend status
        onClick={() => patchFriend()}
        sx={{ backgroundColor: primaryLight, p: "0.6rem" }}
      >
        {isFriend ? (
          // If the user is already a friend, show the remove icon
          <PersonRemoveOutlined sx={{ color: primaryDark }} />
        ) : (
          // If the user is not a friend, show the add icon
          <PersonAddOutlined sx={{ color: primaryDark }} />
        )}
      </IconButton>
    </FlexBetween>
  );
};

// Export the Friend component as the default export
export default Friend;






/*
1. Import necessary components and functions from Material-UI and React libraries.

2. Define the Friend component that receives friendId, name, subtitle, and userPicturePath as props.

3. Define necessary hooks to access Redux state and use the theme from Material-UI.

4. Check if the friendId exists in the user's friends list to determine if the user is already a friend.

5. Define the patchFriend function that updates the friend status by making an API call to the server. The function sends a PATCH request to update the friend list for the current user and dispatches the updated friends list to the Redux store.

6. The component's return statement contains JSX to render the friend information and an IconButton for adding/removing the friend.

7. A custom FlexBetween component arranges its children in a flex container with space between them. It is used to create the layout for the friend information and the IconButton.

8. The friend's user image and name are displayed. Clicking on the name will navigate to the friend's profile page, and the navigation state is set to 0 to reset the navigation stack.

9. An IconButton with either the "Add" or "Remove" icon is displayed based on whether the user is a friend or not. Clicking on the IconButton will call the patchFriend function to update the friend status.

10. The component is exported as the default export for use in other parts of the application.
*/