// Import the Box component and the styled function from Material-UI
import { Box } from "@mui/material";
import { styled } from "@mui/system";

// Define a styled component named WidgetWrapper using the styled function
const WidgetWrapper = styled(Box)(({ theme }) => ({
  // Styling properties for the WidgetWrapper component
  padding: "1.5rem 1.5rem 0.75rem 1.5rem", // Sets padding for the component
  backgroundColor: theme.palette.background.alt, // Sets the background color based on the theme
  borderRadius: "0.75rem", // Sets the border radius to create rounded corners
}));

// Export the WidgetWrapper component as the default export
export default WidgetWrapper;




/*
The WidgetWrapper component is a styled component created using the styled function from Material-UI. It applies specific styles to a Box component to create a widget-like wrapper with padding, background color, and rounded corners.

Here's the explanation of each section:

    Import the Box component from Material-UI. The Box component is a layout component that serves as a generic container.

    Import the styled function from Material-UI. The styled function is used to create custom styled components with specific CSS styles.

    Define the WidgetWrapper component as a styled component using the styled function. It takes the Box component as the base component for styling.

    The styled function receives a callback function that provides the theme object as an argument. The theme object contains the current theme configuration from Material-UI, which includes color palettes and other styling options.

    The callback function returns an object with CSS styles as key-value pairs. These styles will be applied to the Box component used for the WidgetWrapper.

    The padding property sets the padding on all sides of the Box component. The value is set to "1.5rem" for top, right, and left, and "0.75rem" for the bottom. This creates extra padding at the top to create space for widget headers, for example.

    The backgroundColor property sets the background color of the Box component. The value is obtained from the theme object using theme.palette.background.alt, which retrieves the alternative background color from the theme's palette.

    The borderRadius property sets the border radius for the Box component. The value is set to "0.75rem" to create rounded corners for the widget.

    The styled function returns the custom styled component named WidgetWrapper.

    The component is exported as the default export for use in other parts of the application. Once imported, this WidgetWrapper can be used to wrap other components or content to give them the specified styling and appearance of a widget.
*/