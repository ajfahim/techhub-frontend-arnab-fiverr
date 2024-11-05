import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { RouterProvider } from "react-router-dom";
import "./index.css";
import { router } from './Routes/Routes.jsx';
import { AuthContextProvider } from "./context/AuthContext.jsx";
import "animate.css";



ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  </React.StrictMode>
);
