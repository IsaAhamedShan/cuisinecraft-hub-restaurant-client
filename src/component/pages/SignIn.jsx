import React, { useContext, useState } from "react";
import backgroundWhite from "../../assets/others/authentication-light.png";
import { IoArrowBackCircleOutline } from "react-icons/io5";
// import backgroundBlack from '../../assets/others/Authentication-black.png'
import { AiFillGoogleCircle } from "react-icons/ai";
import { FaFacebook } from "react-icons/fa6";
import authenticationImg from "../../assets/others/authentication2.png";
import { FaMicrosoft } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import { Link, useLocation, useNavigate, useNavigation } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { Helmet } from "react-helmet-async";
import { auth } from "../firebase/firebase.config";
const SignIn = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login,googleSignIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation()
  const handleEmailChange = e => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = e => {
    setPassword(e.target.value);
  };
  const successToast = () => toast.success("SignIn Success");
  const unsuccessfulToast = () => toast.error("SignIn Unsuccess");
  const googleProvider = new GoogleAuthProvider();
  const handleSignIn = () => {
    console.log(name, email, password);
    // register(email, password)
    login(email, password)
      .then(res => {
        console.log("success sign up: ", res);
        successToast();
        
        navigate("/");
      })
      .catch(error => {
        console.log("error from sign up: ", error);
        unsuccessfulToast();
      });
  };
  const handleGoogleSignIn =()=>{
    signInWithPopup(auth, googleProvider).then(()=>{
      successToast();
      navigate(location.state?.from?.pathname? location.state?.from?.pathname : "/");
    })
    .catch(error=>{
      console.log("error from signin by google",error)
      unsuccessfulToast()
    })
  }
  return (
    <div
      className="h-[100dvh] flex flex-col justify-center items-center"
      style={{ backgroundImage: `url(${backgroundWhite})` }}
    >
      <Helmet>
        <title>CuisineCraft-Hub | SignIn</title>
      </Helmet>
      <div className="m-auto">
        <div>
          <Link to="/">
            <IoArrowBackCircleOutline className="w-10 h-10" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 py-4 md:py-12 xl:py-12  justify-center items-center max-w-7xl ">
          <Toaster />
          {/* image */}
          {/* <div></div> */}
          <div className="hidden md:block">
            <img src={authenticationImg} alt="" />
          </div>
          {/* signin/registerpage */}
          <div className="w-full">
            <form className="px-16">
              <div className="py-2">
                <label htmlFor="email" className="font-bold">
                  Email:
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={handleEmailChange}
                  className="w-full p-3 rounded-md my-4 "
                  required
                />
              </div>
              <div className="py-2">
                <label htmlFor="password" className="font-bold">
                  Password:
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={handlePasswordChange}
                  className="w-full p-3 rounded-md my-4 "
                  required
                />
              </div>
              <button
                type="button"
                className="btn w-full"
                onClick={handleSignIn}
              >
                Sign In
              </button>
            </form>
            <div className=" flex flex-col justify-center items-center">
              <p className="mb-2 mt-6">
                New here?{" "}
                <Link to="/register" className="font-bold cursor-pointer">
                  Create a account
                </Link>
              </p>
              <p className=" my-2">Or sign in with</p>
              <div className="flex justify-center gap-10 my-4">
                <AiFillGoogleCircle onClick={handleGoogleSignIn} className="text-3xl cursor-pointer hover:scale-105 duration-200" />
                <FaFacebook className="text-3xl cursor-pointer hover:scale-105 duration-200"  />
                <FaMicrosoft className="text-3xl cursor-pointer hover:scale-105 duration-200"  />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
