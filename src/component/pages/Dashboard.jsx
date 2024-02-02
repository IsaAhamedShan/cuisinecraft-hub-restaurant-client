import React from "react";
import { BiSolidContact } from "react-icons/bi";
import { FaHome } from "react-icons/fa";
import { FaBook, FaList, FaShop, FaUser } from "react-icons/fa6";
import { GiKnifeFork } from "react-icons/gi";
import { LuMenu } from "react-icons/lu";
import { NavLink, Outlet } from "react-router-dom";
import logo from "../../assets/main-logo/svg/logo-no-background.svg";

const Dashboard = () => {
  return (
    <div className="flex">
      <div className="w-72 min-h-[100vh] bg-red-300 ">
        <img src={logo} className="w-52 p-6 pl-8" alt="" />

        <ul className="menu mb-10 border-white border-b-2 mx-8">
          <li className="">
            <NavLink to="/dashboard/adminHome" className="flex gap-2 justify-start items-center py-3 ">
              <FaHome></FaHome>Admin Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/addItems" className="flex gap-2 justify-start items-center py-3">
              <GiKnifeFork />
              Add Items
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/manageItems" className="flex gap-2 justify-start items-center py-3">
              <FaList></FaList>Manage Items
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/manageBookings" className="flex gap-2 justify-start items-center py-3">
              <FaBook></FaBook>Manage Bookings
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/allUsers" className="flex gap-2 justify-start items-center py-3 mb-12">
              <FaUser></FaUser>All Users
            </NavLink>
          </li>
        </ul>
        <ul className="menu pl-8">
          <li>
            <NavLink to="/" className="flex gap-2 justify-start items-center py-3">
              <FaHome></FaHome>Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/ourMenu" className="flex gap-2 justify-start items-center py-3">
              <LuMenu />
              Menu
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/ourShop" className="flex gap-2 justify-start items-center py-3">
              <FaShop></FaShop>Shop
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/contactUs" className="flex gap-2 justify-start items-center py-3">
              <BiSolidContact />
              Contact
            </NavLink>
          </li>
        </ul>
      </div>

      <div className="flex-1">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
