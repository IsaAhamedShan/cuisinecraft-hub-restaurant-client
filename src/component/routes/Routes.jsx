import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home";
import Main from "../pages/Main";
import Register from "../pages/Register";
import SignIn from "../pages/SignIn";
import OurMenu from "../pages/OurMenu/OurMenu";
import OurShop from "../pages/OurShop/OurShop";
import Cart from "../pages/Cart/Cart";

import Dashboard from "../pages/Dashboard";
import Mycart from "../pages/Dashboard/Mycart/Mycart.jsx";
import AllUsers from "../pages/Dashboard/AllUsers/AllUsers.jsx";

import AdminRoutes from "./AdminRoutes.jsx";
import AddItems from "../pages/Dashboard/AddItems/AddItems.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/signin",
        element: <SignIn></SignIn>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/ourMenu",
        element: <OurMenu></OurMenu>,
      },
      {
        path: "/ourShop/:categoryName",
        element: <OurShop></OurShop>,
      },
      {
        path: "/cart",
        element: <Cart></Cart>,
      },
    ],
  },
  {
    path: "dashboard",
    element: <Dashboard></Dashboard>,
    children: [
      {
        path: "myCart",
        element: <Mycart></Mycart>,
      },
      {
        path:'allUsers',
        element:<AllUsers></AllUsers>
      }
      ,
      {
        path:"addItems",
        element:<AdminRoutes><AddItems></AddItems></AdminRoutes>
      }
    ],
  },
]);
export default router;
