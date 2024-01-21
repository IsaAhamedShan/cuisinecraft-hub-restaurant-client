import React, { useContext, useState } from "react";
import backgroundWhite from "../../assets/others/authentication-light.png";
// import backgroundBlack from '../../assets/others/Authentication-black.png'
import { AiFillGoogleCircle } from "react-icons/ai";
import { FaFacebook } from "react-icons/fa6";
import authenticationImg from "../../assets/others/authentication2.png";
import { FaMicrosoft } from "react-icons/fa";
import toast, { Toaster } from 'react-hot-toast';
import { Link } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Helmet } from "react-helmet-async";
const SignIn = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);

  const handleEmailChange = e => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = e => {
    setPassword(e.target.value);
  };
  const successToast = ()=>toast.success("SignIn Success")
  const unsuccessfulToast = ()=>toast.error("SignIn Unsuccess")

  const handleSignIn = () => {
    console.log(name, email, password);
    // register(email, password)
    login(email, password)
      .then(res => {
        console.log("success sign up: ", res);
        successToast()
      })
      .catch(error => {
        console.log("error from sign up: ", error);
        unsuccessfulToast()
      });
  };
  return (
    <div
      className="h-[100dvh]"
      style={{ backgroundImage: `url(${backgroundWhite})` }}
    >
      <Helmet>
        <title>CuisineCraft-Hub | SignIn</title>
      </Helmet>
      <div className="grid grid-cols-1 md:grid-cols-2 py-4 md:py-12 xl:py-12  justify-center items-center max-w-7xl m-auto">
      <Toaster />
      {/* image */}
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
            <button type="button" className="btn w-full" onClick={handleSignIn}>
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
              <AiFillGoogleCircle className="text-3xl" />
              <FaFacebook className="text-3xl" />
              <FaMicrosoft className="text-3xl" />
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default SignIn;
