import { motion } from "framer-motion";
import { useState } from "react";
import { updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import {
  PiFacebookLogoLight,
  PiGoogleLogoLight,
  PiLinkedinLogoLight,
} from "react-icons/pi";
import { useContext } from "react";
import { AuthContext } from "../..//provider/authProvider";
import { VscGithubAlt } from "react-icons/vsc";
import logo from "../..//assets/photos/logo.png";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  FacebookAuthProvider,
  createUserWithEmailAndPassword
} from "firebase/auth";
import app from "../../firebase/firebase.init";
import Swal from "sweetalert2";

const Authentication = () => {
  const [isSignIn, setIsSignIn] = useState(false);

  const formAnimationSignIn = {
    key: "form-left",
    initial: {
      x: "100%",
      opacity: 0,
    },
    animate: {
      x: 0,
      opacity: 1,
    },
    exit: {
      x: "100%",
      opacity: 0,
      transition: { duration: 0.3 },
    },
    transition: { duration: 0.5, ease: "easeOut" },
  };
  const formAnimationSignUp = {
    key: "form-right",
    initial: {
      x: "-100%",
      opacity: 0,
    },
    animate: {
      x: 0,
      opacity: 1,
    },
    exit: {
      x: "100%",
      opacity: 0,
      transition: { duration: 0.3 },
    },
    transition: { duration: 0.5, ease: "easeOut" },
  };
  const signUpSignInText = {
    key: "signUpSignInText",
    initial: {
      x: "100%",
      opacity: 0,
    },
    animate: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.3 }, // Add transition for opacity animation
    },
    exit: {
      x: "100%",
      opacity: 0,
      transition: { duration: 0.3 },
    },
    transition: { duration: 0.2, ease: "easeOut" },
  };

  // signUp
  const { createUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;

    if (password.length < 6) {
      Swal.fire({
        title: "Password must be six characters",
        showClass: {
          popup: "animate__animated animate__fadeInDown",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutUp",
        },
      });
      return;
    }

    if (
      !/(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])(?=.*[A-Z])/.test(password)
    ) {
      Swal.fire({
        title: "Password must an upper latter and one special character",
        showClass: {
          popup: "animate__animated animate__fadeInDown",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutUp",
        },
      });
      return;
    }

    //create User

    createUser(email, password)
      .then((result) => {
        updateUserData(result.user, name);
        console.log(result.user, name);
        Swal.fire({
          title: "Registration Successful",
          showClass: {
            popup: "animate__animated animate__fadeInDown",
          },
          hideClass: {
            popup: "animate__animated animate__fadeOutUp",
          },
        });
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const updateUserData = (user, name) => {
    updateProfile(user, {
      displayName: name,
    })
      .then(() => {
        console.log("User Profile Updated");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const auth = getAuth(app);

  /*-----------Google Authenticator-----------*/
  const googleProvider = new GoogleAuthProvider();

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const user = result.user;
        console.log(user);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  /*-----------LogOut-----------*/
  const handleSignOut = () => {
    signOut(auth)
      .then((result) => {
        console.log(result);
        setUser(null);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  /*-----------Facebook Authenticator-----------*/
  const fbProvider = new FacebookAuthProvider();
  const handleFacebookSignIn = () => {
    signInWithPopup(auth, fbProvider)
      .then((result) => {
        const user = result.user;
        console.log(user);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="flex justify-center items-center h-[100vh] w-full">
      <div
        className="bg-white rounded-3xl shadow-lg relative overflow-hidden w-[768px] max-w-full min-h-[480px] flex justify-center items-center"
        id="container"
      >
        <div className={`mx-4 ${isSignIn ? "order-0" : "order-1"}`}>
          {isSignIn ? (
            <motion.form
              {...formAnimationSignIn}
              className="flex flex-col justify-center items-center"
            >
              <h1 className="text-3xl my-4">Sign In</h1>
              <div className="social-icons flex justify-around items-center w-full my-4">
                <div
                  onClick={handleFacebookSignIn}
                  className="btn bg-transparent  border-none"
                >
                  <PiFacebookLogoLight className="text-3xl " />
                </div>

                <div
                  onClick={handleGoogleSignIn}
                  className="btn bg-transparent  border-none"
                >
                  <PiGoogleLogoLight className="text-3xl  " />
                </div>
              </div>
              <span className="mt-2 mb-4">or use your email password</span>
              <label className="input input-bordered flex items-center gap-2 h-10 my-1">
                Email :
                <input
                  type="email"
                  className="grow py-0 input-md"
                  placeholder="example@gmail.com"
                />
              </label>
              <label className="input input-bordered flex items-center gap-2 h-10 my-1 mb-6">
                Password :
                <input
                  type="Password"
                  className="password"
                  placeholder="password"
                />
              </label>
              <a className="mb-4">Forget Your Password?</a>
              <button className="btn btn-sm btn-wide rounded-sm max-h-6">
                Sign In
              </button>
            </motion.form>
          ) : (
            /*------------------Star of Sign Up Form--------------------------------*/
            <motion.form
              onSubmit={handleRegister}
              {...formAnimationSignUp}
              className="flex flex-col justify-center items-center"
            >
              <h1 className="text-3xl my-4 text-center">Create Account</h1>
              <div className="social-icons flex justify-around items-center w-full my-4">
                <div
                  onClick={handleFacebookSignIn}
                  className="btn bg-transparent  border-none"
                >
                  <PiFacebookLogoLight className="text-3xl " />
                </div>

                <div
                  onClick={handleGoogleSignIn}
                  className="btn bg-transparent  border-none"
                >
                  <PiGoogleLogoLight className="text-3xl  " />
                </div>
              </div>

              <span className="mt-2 mb-4 text-center">
                or use your email password
              </span>

              <label className="input input-bordered flex items-center gap-2 h-10 my-1">
                Name:
                <input
                  type="name"
                  name="name"
                  className="grow py-0 input-md"
                  placeholder=""
                />
              </label>
              <label className="input input-bordered flex items-center gap-2 h-10 my-1">
                Email:
                <input
                  type="email"
                  name="email"
                  className="grow py-0 input-md"
                  placeholder="example@gmail.com"
                />
              </label>
              <label className="input input-bordered flex items-center gap-2 h-10 my-1 mb-6">
                Password:
                <input
                  type="Password"
                  name="password"
                  className="password"
                  placeholder="password"
                />
              </label>
              <button className="btn btn-sm btn-wide rounded-sm max-h-6">
                Sign Up
              </button>
            </motion.form>
          )}
        </div>

        <motion.div
          className={`mx-4 ${isSignIn ? "order-1" : "order-0"}`}
          {...signUpSignInText}
        >
          {isSignIn ? (
            <div className=" flex justify-center items-center mx-4">
              <div className=" flex justify-center items-center flex-col">
                <div
                  className={`toggle-panel ${
                    isSignIn ? "order-1" : "order-0"
                  } flex justify-center items-center flex-col`}
                >
                  <h1 className="text-3xl  text-center mt-4">
                    {isSignIn ? (
                      <img className="w-[250px]" src={logo} />
                    ) : (
                      <img src={logo} />
                    )}
                  </h1>
                  <p className="text-center mb-4 max-w-[300px]">
                    {isSignIn
                      ? "Share your symptoms, and let's out the best way forward! Stay healthy, stay informed!"
                      : "A virtual health companion guiding you towards better well-being"}
                  </p>
                  {isSignIn ? (
                    <button
                      className="btn btn-sm rounded-sm"
                      id="register"
                      onClick={() => setIsSignIn(false)}
                    >
                      Sign Up
                    </button>
                  ) : (
                    <button
                      className="btn btn-sm rounded-sm"
                      id="login"
                      onClick={() => setIsSignIn(true)}
                    >
                      Sign In
                    </button>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className=" flex justify-center items-center mx-4">
              <div className=" flex justify-center items-center flex-col">
                <div
                  className={`toggle-panel ${
                    isSignIn ? "order-1" : "order-0"
                  } flex justify-center items-center flex-col`}
                >
                  <h1 className="text-3xl  text-center mt-4">
                    {isSignIn ? (
                      <img className="w-[250px]" src={logo} />
                    ) : (
                      <img className="w-[250px]" src={logo} />
                    )}
                  </h1>
                  <p className="text-center mb-4 max-w-[300px]">
                    {isSignIn
                      ? "Share your symptoms, and let's out the best way forward! Stay healthy, stay informed!"
                      : "A virtual health companion guiding you towards better well-being"}
                  </p>
                  {isSignIn ? (
                    <button
                      className="btn btn-sm rounded-sm"
                      id="register"
                      onClick={() => setIsSignIn(false)}
                    >
                      Sign Up
                    </button>
                  ) : (
                    <button
                      className="btn btn-sm rounded-sm"
                      id="login"
                      onClick={() => setIsSignIn(true)}
                    >
                      Sign In
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Authentication;
