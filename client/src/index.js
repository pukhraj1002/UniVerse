import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import authReducer from "./state";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { PersistGate } from "redux-persist/integration/react";

// Configuration for redux-persist to specify where and how to store the Redux state.
const persistConfig = { key: "root", storage, version: 1 };
// Creating a persisted reducer by wrapping the authReducer with redux-persist.
const persistedReducer = persistReducer(persistConfig, authReducer);
// Creating the Redux store using the configured reducer and middleware.
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignoring specific Redux actions that are not serializable.
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Using React's createRoot function to render the app.
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // Wrapping the entire app with StrictMode for additional checks during development.
  <React.StrictMode>
    {/* Providing the Redux store to all the components in the app. */}
    <Provider store={store}>
      {/* PersistGate waits for the persisted state to be retrieved from storage before rendering the app. */}
      <PersistGate loading={null} persistor={persistStore(store)}>
        {/* Rendering the main App component. */}
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);



/*
    Importing necessary libraries and components for Redux, React, and Redux-persist.

    persistConfig: Configuration object for Redux-persist specifying the key, storage type, and version.

    persistedReducer: Creating a persisted reducer by wrapping the authReducer with Redux-persist. This ensures that the Redux state is stored and rehydrated between sessions.

    store: Creating the Redux store using the configureStore function from Redux Toolkit. It accepts the persisted reducer and custom middleware to handle non-serializable actions.

    ReactDOM.createRoot: This method is used to create the root of the React application. It allows us to use Concurrent Mode, which can improve performance by rendering components asynchronously.

    React.StrictMode: Wrapping the entire app with StrictMode to perform additional checks during development.

    <Provider store={store}>: Providing the Redux store to all components in the app using the Provider from react-redux. This allows components to access the Redux state.

    <PersistGate loading={null} persistor={persistStore(store)}>: This component waits for the persisted state to be retrieved from storage (if any) before rendering the app. The loading prop is set to null to display nothing during the loading process.

    <App />: Rendering the main App component, which contains the entire application logic and routing.
*/