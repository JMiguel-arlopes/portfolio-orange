import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import { GoogleOAuthProvider } from '@react-oauth/google';
import GoogleLoginButton from "./components/googleLoginButton/GoogleLoginButton";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Login />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/googleLogin",
        element: <GoogleLoginButton />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/explore",
        element: <Explore />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="1059231167654-cq63pk7ssegtb96rn0top7bbi0d5r5d7.apps.googleusercontent.com">
      <UserProvider>
        <RouterProvider router={router} />
      </UserProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);

reportWebVitals();
