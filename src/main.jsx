import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./component/routes/Routes.jsx";
import AuthProvider from "./component/provider/AuthProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      {/* <div className="max-w-screen-xl mx-auto"> */}
        <RouterProvider router={router} />
      {/* </div> */}
    </AuthProvider>
  </React.StrictMode>
);
