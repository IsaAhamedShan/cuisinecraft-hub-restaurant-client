import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./component/routes/Routes.jsx";
import AuthProvider from "./component/provider/AuthProvider.jsx";
import { HelmetProvider } from "react-helmet-async";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      <AuthProvider>
        {/* <div className="max-w-screen-xl mx-auto"> */}
        <RouterProvider router={router} />
        {/* </div> */}
      </AuthProvider>
    </HelmetProvider>
  </React.StrictMode>
);
