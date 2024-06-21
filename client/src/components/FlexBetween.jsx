// Import necessary components and functions from Material-UI
import { Box } from "@mui/material"; // The Box component provides a flexible container that can contain other elements.
import { styled } from "@mui/system"; // The styled function is used to create custom styled components.

// Create a custom styled component called FlexBetween using the styled function
const FlexBetween = styled(Box)({
  display: "flex", // Set the display property to flex to create a flex container
  justifyContent: "space-between", // Set the justify-content property to space-between to evenly distribute items along the main axis with space in-between
  alignItems: "center", // Set the align-items property to center to vertically align items at the center of the container
});

// Export the custom styled component FlexBetween
export default FlexBetween;


/*
This code creates a custom styled component named FlexBetween using the styled function from Material-UI. The FlexBetween component is a Box container with flex properties to achieve a layout with items displayed in a row, evenly distributed along the main axis with space in-between, and vertically centered. This component can be used in other parts of the program to create flexible layouts with consistent styles for alignment and spacing.
*/