import {
    createBrowserRouter
} from "react-router-dom";
import Home from "../pages/Home/Home";
import Main from "../pages/Main";
import Register from "../pages/Register";
import SignIn from "../pages/SignIn";
import OurMenu from "../pages/OurMenu/OurMenu"
import Dashboard from "../pages/Dashboard/Dashboard";
import OurShop from "../pages/OurShop/OurShop";
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
        {
          path:"/ourMenu",
          element:<OurMenu></OurMenu>
        },
        {
          path:"/dashboard",
          element:<Dashboard></Dashboard>
        },{
          path:"/ourShop/:categoryName",
          element:<OurShop></OurShop>
        }
      ]
    },
  ]);
  export default router;