import { createBrowserRouter } from "react-router-dom";
import Cart from "../pages/Cart/Cart";
import Home from "../pages/Home/Home";
import Main from "../pages/Main";
import OurMenu from "../pages/OurMenu/OurMenu";
import OurShop from "../pages/OurShop/OurShop";
import Register from "../pages/Register";
import SignIn from "../pages/SignIn";

import Dashboard from "../pages/Dashboard";
import AllUsers from "../pages/Dashboard/AllUsers/AllUsers.jsx";
import Mycart from "../pages/Dashboard/Mycart/Mycart.jsx";

import ContactUs from "../pages/ContactUs/ContactUs.jsx";
import AddItems from "../pages/Dashboard/AddItems/AddItems.jsx";
import ManageItem from "../pages/Dashboard/ManageItem/ManageItem.jsx";
import Payment from "../pages/Dashboard/Payment/Payment.jsx";
import UpdateItem from "../pages/Dashboard/UpdateItem/UpdateItem.jsx";
import AdminRoutes from "./AdminRoutes.jsx";
import PaymentHistory from "../pages/Dashboard/PaymentHistory/PaymentHistory.jsx";
import UserHome from "../UserHome/UserHome.jsx";
import AdminHome from "../AdminHome/AdminHome.jsx";
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
      {
        path: "/contactUs",
        element: <ContactUs></ContactUs>,
      },
    ],
  },
  {
    path: "dashboard",
    element: <Dashboard></Dashboard>,
    children: [
      {
        path: "userHome",
        element: <UserHome></UserHome>,
      },
      {
        path: "AdminHome",
        element: <AdminHome></AdminHome>,
      },
      {
        path: "myCart",
        element: <Mycart></Mycart>,
      },
      {
        path: "payment",
        element: <Payment></Payment>,
      },

      {
        path: "allUsers",
        element: (
          <AdminRoutes>
            <AllUsers></AllUsers>
          </AdminRoutes>
        ),
      },
      {
        path: "manageItems",
        element: (
          <AdminRoutes>
            <ManageItem></ManageItem>
          </AdminRoutes>
        ),
      },
      {
        path: "updateItem/:id",
        element: (
          <AdminRoutes>
            <UpdateItem></UpdateItem>
          </AdminRoutes>
        ),
      },
      //admin only routes
      {
        path: "addItems",
        element: (
          <AdminRoutes>
            <AddItems></AddItems>
          </AdminRoutes>
        ),
      },
      {
        path: "paymentHistory",
        element: <PaymentHistory></PaymentHistory>,
      },
    ],
  },
]);
export default router;
