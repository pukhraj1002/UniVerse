import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import HomePage from "scenes/homePage";
import LoginPage from "scenes/loginPage";
import ProfilePage from "scenes/profilePage";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";

function App() {
  // Get the current mode from the Redux store
  const mode = useSelector((state) => state.mode);

  // Create a MUI theme based on the current mode
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  // Check if the user is authenticated
  const isAuth = Boolean(useSelector((state) => state.token));

  return (
    <div className="app">
      <BrowserRouter>
        {/* Provide the MUI theme to the entire app */}
        <ThemeProvider theme={theme}>
          {/* Apply a baseline style to improve cross-browser consistency */}
          <CssBaseline />
          <Routes>
            {/* Define routes for different pages */}
            {/* Route for the login page */}
            <Route path="/" element={<LoginPage />} />

            {/* Route for the home page */}
            {/* If the user is authenticated, show the home page, else redirect to the login page */}
            <Route
              path="/home"
              element={isAuth ? <HomePage /> : <Navigate to="/" />}
            />

            {/* Route for the user profile page */}
            {/* If the user is authenticated, show the profile page with the corresponding userId, else redirect to the login page */}
            <Route
              path="/profile/:userId"
              element={isAuth ? <ProfilePage /> : <Navigate to="/" />}
            />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;




/*
In this App.js file, I have added comments to explain the purpose of each line of code and the functionality of each part of the app.

1: Import necessary components and scenes for routing and pages.
2: useSelector is used to access the Redux store and get the current mode (light or dark).
3: useMemo is used to create a MUI theme based on the current mode, which will be memoized to avoid unnecessary recalculations when the mode doesn't change.
4: isAuth is a boolean variable that checks if the user is authenticated based on the presence of the authentication token in the Redux store.
5: The main App component starts, and we use BrowserRouter from React Router to enable routing functionality.
6: We wrap the entire app with ThemeProvider from MUI to provide the theme to all the components in the app.
7: CssBaseline is applied to provide a baseline style to improve cross-browser consistency.
8: We define the routes for different pages using the Routes component from React Router.
    9: The first route is for the login page (/), which renders the LoginPage component.
    10: The second route is for the home page (/home), and it uses a ternary operator to conditionally render either the HomePage component if the user is authenticated or redirects to the login page using Navigate from React Router if the user is not authenticated.
    11: The third route is for the user profile page (/profile/:userId), and it also uses a ternary operator to conditionally render either the ProfilePage component with the corresponding userId if the user is authenticated or redirects to the login page using Navigate if the user is not authenticated.
    12: The ThemeProvider provides the MUI theme to all the components within the BrowserRouter, allowing them to access the theme properties and styles.
    13: The CssBaseline component applies a baseline style to the entire app, ensuring consistent styles across different browsers.
    14: The Routes component defines the different routes of the app, specifying the components to render for each route.
    15: Inside the Routes, we have three Route components:
        16: The first Route is for the login page (/), and it renders the LoginPage component when the URL matches /.
        17: The second Route is for the home page (/home). It uses a ternary operator to conditionally render the HomePage component if the user is authenticated (isAuth is true) or redirect to the login page (Navigate) if the user is not authenticated.
        18: The third Route is for the user profile page (/profile/:userId). Like the second route, it also uses a ternary operator to conditionally render the ProfilePage component with the corresponding userId if the user is authenticated or redirect to the login page (Navigate) if the user is not authenticated.
19: The App component returns the entire app structure, which includes the BrowserRouter, the ThemeProvider, and the Routes with the defined routes. The CssBaseline is applied to ensure baseline styles for the app.

*/