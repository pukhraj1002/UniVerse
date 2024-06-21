// Import the Box component from Material-UI
import { Box } from "@mui/material";

// UserImage component definition, receives `image` and `size` as props
const UserImage = ({ image, size = "60px" }) => {
  return (
    // Box component used as a container to control the size of the image
    <Box width={size} height={size}>
      {/* Actual image element */}
      <img
        style={{ objectFit: "cover", borderRadius: "50%" }}
        width={size}
        height={size}
        alt="user"
        // Set the image source using the provided `image` prop
        src={`http://localhost:3001/assets/${image}`}
      />
    </Box>
  );
};

// Export the UserImage component as the default export
export default UserImage;





/*
The UserImage component is a simple functional component that displays a user's image. It uses the Material-UI Box component to control the size of the image and sets the image source dynamically using the image prop.

Here's the explanation of each section:

    Import the Box component from Material-UI. The Box component is a layout component that allows you to apply styling and control dimensions to its children.

    Define the UserImage component that receives two props: image (the image URL) and size (the width and height of the image). The size prop has a default value of "60px" if not provided.

    The component's return statement contains JSX to render the user's image.

    The Box component is used as a container to control the size of the image. The width and height props are set to the value of the size prop provided.

    The actual img element is used to display the user's image. Inline styling is applied to the image using the style prop. objectFit: "cover" ensures that the image covers the entire box, and borderRadius: "50%" creates a circular shape for the image.

    The width and height attributes of the img element are set to the value of the size prop provided.

    The alt attribute is set to "user" for accessibility purposes, providing alternative text when the image cannot be displayed.

    The src attribute is set dynamically using a template string. It combines the provided image prop with the base URL http://localhost:3001/assets/ to form the complete image URL.

    The component is exported as the default export for use in other parts of the application.
*/