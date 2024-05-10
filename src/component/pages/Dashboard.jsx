import { useContext, useEffect, useState } from "react";
import { BiSolidContact } from "react-icons/bi";
import { BsCalendarDate } from "react-icons/bs";
import { FaHome } from "react-icons/fa";
import { FaBook, FaList, FaShop, FaUser } from "react-icons/fa6";
import { GiKnifeFork } from "react-icons/gi";
import { IoMdCart, IoMdMenu } from "react-icons/io";
import { LuMenu } from "react-icons/lu";
import { MdDateRange, MdOutlineRateReview, MdPayment } from "react-icons/md";
import { NavLink, Outlet } from "react-router-dom";
import logo from "../../assets/main-logo/svg/logo-no-background.svg";
import useAdmin from "../Hooks/useAdmin";
import { AuthContext } from "../provider/AuthProvider";
const Dashboard = () => {
  const [isAdmin] = useAdmin();
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="flex ">
      {/* drawer */}
      <div className="drawer">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Page content here */}
          <label
            htmlFor="my-drawer"
            className={`btn my-2 drawer-button ${
              isSmallScreen ? "" : "hidden"
            }`}
          >
            <IoMdMenu />
          </label>
          <div className="flex-1">
            <Outlet></Outlet>
          </div>
        </div>
        <div id="drawer-side" className={isSmallScreen ? "drawer-side" : ""}>
          <label
            htmlFor="my-drawer"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          {/* drawer content */}
          <div className="w-72 min-h-[100vh] bg-red-300 sticky top-0">
            <img src={logo} className="w-52 p-6 pl-12" alt="" />
            {user && isAdmin ? (
              <ul className="menu mb-10 border-white border-b-2 mx-6">
                <li className="">
                  <NavLink
                    to="/dashboard/adminHome"
                    className="flex gap-2 justify-start items-center py-3 md:text-xl"
                  >
                    <FaHome className="md:text-xl"></FaHome>Admin Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/addItems"
                    className="flex gap-2 justify-start items-center py-3 md:text-xl"
                  >
                    <GiKnifeFork className="md:text-xl" />
                    Add Items
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/manageItems"
                    className="flex gap-2 justify-start items-center py-3 md:text-xl"
                  >
                    <FaList className="md:text-xl"></FaList>Manage Items
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/manageBookings"
                    className="flex gap-2 justify-start items-center py-3 md:text-xl"
                  >
                    <FaBook className="md:text-xl"></FaBook>Manage Bookings
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/allUsers"
                    className="flex gap-2 justify-start items-center py-3 mb-12 md:text-xl"
                  >
                    <FaUser className="md:text-xl"></FaUser>All Users
                  </NavLink>
                </li>
              </ul>
            ) : (
              <ul className="menu mb-10 border-white border-b-2 mx-6">
                <li>
                  <NavLink
                    to="/dashboard/userHome"
                    className="flex gap-2 justify-start items-center py-3  md:text-xl"
                  >
                    <FaHome className="md:text-xl"></FaHome>User Home
                  </NavLink>
                </li>
                <li className="">
                  <NavLink
                    to="/dashboard/reservation"
                    className="flex gap-2 justify-start items-center py-3  md:text-xl"
                  >
                    <MdDateRange className="md:text-xl" />
                    Reservation
                  </NavLink>
                </li>
                <li className="">
                  <NavLink
                    to="/dashboard/paymentHistory"
                    className="flex gap-2 justify-start items-center py-3  md:text-xl"
                  >
                    <MdPayment className="md:text-xl" />
                    Payment History
                  </NavLink>
                </li>
                <li className="">
                  <NavLink
                    to="/dashboard/myCart"
                    className="flex gap-2 justify-start items-center py-3  md:text-xl"
                  >
                    <IoMdCart className="md:text-xl" />
                    My Cart
                  </NavLink>
                </li>
                <li className="">
                  <NavLink
                    to="/dashboard/addReview"
                    className="flex gap-2 justify-start items-center py-3  md:text-xl"
                  >
                    <MdOutlineRateReview className="md:text-xl" />
                    Add Review
                  </NavLink>
                </li>
                <li className="">
                  <NavLink
                    to="/dashboard/myBookings"
                    className="flex gap-2 justify-start items-center py-3  md:text-xl"
                  >
                    <BsCalendarDate className="md:text-xl" />
                    My Bookings
                  </NavLink>
                </li>
              </ul>
            )}
            {/* admin dashboard */}
            {/* {
              <ul className="menu mb-10 border-white border-b-2 mx-6">
                <li className="">
                  <NavLink
                    to="/dashboard/adminHome"
                    className="flex gap-2 justify-start items-center py-3 md:text-xl"
                  >
                    <FaHome className="md:text-xl"></FaHome>Admin Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/addItems"
                    className="flex gap-2 justify-start items-center py-3 md:text-xl"
                  >
                    <GiKnifeFork className="md:text-xl" />
                    Add Items
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/manageItems"
                    className="flex gap-2 justify-start items-center py-3 md:text-xl"
                  >
                    <FaList className="md:text-xl"></FaList>Manage Items
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/manageBookings"
                    className="flex gap-2 justify-start items-center py-3 md:text-xl"
                  >
                    <FaBook className="md:text-xl"></FaBook>Manage Bookings
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/allUsers"
                    className="flex gap-2 justify-start items-center py-3 mb-12 md:text-xl"
                  >
                    <FaUser className="md:text-xl"></FaUser>All Users
                  </NavLink>
                </li>
              </ul>
            } */}

            {/* user dashboard */}
            {/* {
              <ul className="menu mb-10 border-white border-b-2 mx-6">
                <li className="">
                  <NavLink
                    to="/dashboard/userHome"
                    className="flex gap-2 justify-start items-center py-3  md:text-xl"
                  >
                    <FaHome className="md:text-xl"></FaHome>User Home
                  </NavLink>
                </li>
                <li className="">
                  <NavLink
                    to="/dashboard/reservation"
                    className="flex gap-2 justify-start items-center py-3  md:text-xl"
                  >
                    <MdDateRange className="md:text-xl" />
                    Reservation
                  </NavLink>
                </li>
                <li className="">
                  <NavLink
                    to="/dashboard/paymentHistory"
                    className="flex gap-2 justify-start items-center py-3  md:text-xl"
                  >
                    <MdPayment className="md:text-xl" />
                    Payment History
                  </NavLink>
                </li>
                <li className="">
                  <NavLink
                    to="/dashboard/myCart"
                    className="flex gap-2 justify-start items-center py-3  md:text-xl"
                  >
                    <IoMdCart className="md:text-xl" />
                    My Cart
                  </NavLink>
                </li>
                <li className="">
                  <NavLink
                    to="/dashboard/addReview"
                    className="flex gap-2 justify-start items-center py-3  md:text-xl"
                  >
                    <MdOutlineRateReview className="md:text-xl" />
                    Add Review
                  </NavLink>
                </li>
                <li className="">
                  <NavLink
                    to="/dashboard/myBookings"
                    className="flex gap-2 justify-start items-center py-3  md:text-xl"
                  >
                    <BsCalendarDate className="md:text-xl" />
                    My Bookings
                  </NavLink>
                </li>
              </ul>
            } */}
            {/* common dashboard */}
            <ul className="menu pl-8">
              <li>
                <NavLink
                  to="/"
                  className="flex gap-2 justify-start items-center py-3 md:text-xl"
                >
                  <FaHome className="md:text-xl"></FaHome>Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/ourMenu"
                  className="flex gap-2 justify-start items-center py-3 md:text-xl"
                >
                  <LuMenu className="md:text-xl" />
                  Menu
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/ourShop/salad"
                  className="flex gap-2 justify-start items-center py-3 md:text-xl"
                >
                  <FaShop className="md:text-xl"></FaShop>Shop
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/contactUs"
                  className="flex gap-2 justify-start items-center py-3 md:text-xl"
                >
                  <BiSolidContact className="md:text-xl" />
                  Contact
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
