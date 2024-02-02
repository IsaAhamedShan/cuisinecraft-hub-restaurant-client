import { useContext, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import logoVertical from "../../../assets/main-logo/svg/logo-no-background-vertical.svg";
import logo from "../../../assets/main-logo/svg/logo-no-background.svg";
import { AuthContext } from "../../provider/AuthProvider";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaOpencart } from "react-icons/fa6";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useCart from "../../Hooks/useCart";

const Navbar = () => {
  const { logout } = useContext(AuthContext);
  const [scrolling, setScrolling] = useState(false);
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure()
  const [cart] = useCart();

  const handleLogout = () => {
    logout()
      .then(() => {
        console.log("user logged out");
        const successLogout = () => {
          toast.success("User logged out");
        };
        successLogout();
      })
      .catch(error => {
        console.log("error logging out, error: " + error);
        const unsuccessLogout = () => {
          toast.error("User logged out Error");
        };
        unsuccessLogout();
      });
  };
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolling(true);
      } else setScrolling(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const navList = (
    <>
      <li className="font-bold font-raleway">
        <Link to="/">HOME</Link>
      </li>
      <li className="font-bold font-raleway">
        <Link to="/contactUs">CONTACT US</Link>
      </li>
      <li className="font-bold font-raleway">
        <Link to="/dashboard">DASHBOARD</Link>
      </li>
      <li className="font-bold font-raleway">
        <Link to="/ourMenu">MENU</Link>
      </li>
      <li className="font-bold font-raleway">
        <Link to="/ourShop/salad">SHOP</Link>
      </li>
      {user ? (
        <li>
          
            <Link to='/dashboard/myCart'  className="flex gap-2">
              <FaOpencart className="text-2xl" />
              <div className="badge badge-secondary h-5">{cart && cart.length}</div>
            </Link>
          
        </li>
      ) : null}
      {user ? null : (
        <>
          <li className="font-bold font-raleway">
            <Link to="/signin">SIGN IN</Link>
          </li>
          <li className="font-bold font-raleway">
            <Link to="/register">REGISTER</Link>
          </li>
        </>
      )}
      {user ? (
        <li className="font-bold font-raleway" onClick={handleLogout}>
          <Link>LOGOUT</Link>
        </li>
      ) : null}
    </>
  );

  return (
    <div
      className={`navbar ${
        scrolling ? "bg-[#F3F3B7] opacity-60 text-gray-700" : "bg-[#F3F3B7]"
      }  h-16 md:h-[110px] px-10 transition-all duration-300 fixed z-10`}
    >
      <div className="navbar-start w-full ">
        <Toaster></Toaster>
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-md w-52 "
          >
            {navList}
          </ul>
        </div>
        <div className="w-full flex justify-center items-center mr-10 lg:mr-0 lg:justify-start">
          <img src={logo} className="w-44 hidden md:block" alt="" />
          <img src={logoVertical} className="w-44  md:hidden" alt="" />
        </div>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 flex justify-center items-center">
          {navList}
        </ul>
      </div>
      <div className="">
        {user ? (
          <>
            {user?.photoURL ? (
              <Link className="px-4 w-24">
                <img
                  className="w-10 rounded-full"
                  src={user.photoURL}
                  alt="USERS_NAME"
                />
              </Link>
            ) : (
              <FaRegCircleUser className=" w-7 h-7 xl:w-10 xl:h-10 text-[#301c3b]" />
            )}
          </>
        ) : null}
      </div>
    </div>
  );
};

export default Navbar;
