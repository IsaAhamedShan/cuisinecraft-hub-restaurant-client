import {
    createBrowserRouter
} from "react-router-dom";
import Home from "../pages/Home/Home";
import Main from "../pages/Main";
import Register from "../pages/Register";
import SignIn from "../pages/SignIn";

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