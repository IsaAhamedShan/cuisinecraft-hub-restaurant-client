import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
import Main from "../pages/Main";
import Home from "../pages/Home";
import SignIn from "../pages/SignIn";
import Register from "../pages/Register";

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children:[
        {
            path:"/",
            element:<Home></Home>
        },
        {
            path:"/signin",
            element:<SignIn></SignIn>
        },
        {
            path:"/register",
            element:<Register></Register>
        },
      ]
    },
  ]);
  export default router;