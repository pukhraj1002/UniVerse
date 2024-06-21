import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import Form from "./Form";

const LoginPage = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  return (
    <Box
      minHeight="100vh"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      background="linear-gradient(to bottom, #41B3A3, #4A69BB)"
    >
      <Box
        width={isNonMobileScreens ? "40%" : "90%"}
        p="2rem"
        borderRadius="1.5rem"
        backgroundColor={theme.palette.background.paper}
        boxShadow={5}
      >
        <Box textAlign="center" mb={4}>
          <Typography variant="h3" color="primary">
            UniVerse
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Welcome to Socipedia, the Social Media for Sociopaths!
          </Typography>
        </Box>
        <Form />
      </Box>
      <Typography variant="caption" mt={2} color="text.secondary">
        © 2023 UniVerse. All rights reserved.
      </Typography>
    </Box>
  );
};

export default LoginPage;
