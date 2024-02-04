import { useContext, useState } from "react";
import backgroundWhite from "../../assets/others/authentication-light.png";
import { IoArrowBackCircleOutline } from "react-icons/io5";
// import backgroundBlack from '../../assets/others/Authentication-black.png'
import ReCAPTCHA from "react-google-recaptcha";
import toast, { Toaster } from "react-hot-toast";
import { AiFillGoogleCircle } from "react-icons/ai";
import { FaMicrosoft } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import authenticationImg from "../../assets/others/authentication2.png";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { AuthContext } from "../provider/AuthProvider";
import { updateProfile } from "firebase/auth";
import { auth } from "../firebase/firebase.config";
const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { register } = useContext(AuthContext);
  const [captchaVal, setCaptchaVal] = useState(false);
  const recaptchaSiteKey = import.meta.env.VITE_recapthaSiteKey;
  const handleNameChange = e => {
    setName(e.target.value);
  };
  const handleEmailChange = e => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = e => {
    setPassword(e.target.value);
  };
  const successToast = () => toast.success("Registration Success");
  const unsuccessfulToast = () => toast.error("Registration Unsuccess");
  const axiosSecure = useAxiosSecure();
  function onChange(captchaValue) {
    axiosSecure
      .post("/verifyRecaptcha", {
        recaptchaValue: captchaValue,
      })
      .then(res => {
        setCaptchaVal(true);
        console.log("res in verify-recaptcha :", res)
        // res.success === true ? setCaptchaVal(true) : setCaptchaVal(false);
        setCaptchaVal(true)
      })
      .catch(error => {
        console.log("captcha error :",error);
      });

    console.log("Captcha value:", captchaValue);
    setCaptchaVal(captchaValue);
  }

  const handleSignUp = () => {
    console.log(name, email, password);
    // register(email, password)

    if (captchaVal) {
      register(email, password)
        .then(res => {
          updateProfile(auth.currentUser, {
            displayName: name,
          });
          console.log("success sign up: ", res);
          successToast();
          axiosSecure.post("/users", {
            email:email,
            username:name
          }).then(()=>{
            console.log('user inserted successfully')
          })
          .catch(console.log('user could not insert'))
          navigate("/");
        })
        .catch(error => {
          console.log("error from sign up: ", error);
          unsuccessfulToast();
        });
    } else {
      console.log("signup error");
    }
  };
  return (
    <div
      className="h-[100dvh] flex justify-center items-center"
      style={{ backgroundImage: `url(${backgroundWhite})` }}
    >
      <div className="m-auto">
        <div>
          <div>
            <Link to="/">
              <IoArrowBackCircleOutline className="w-10 h-10" />
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 py-4 md:py-12 xl:py-12  justify-center items-center max-w-7xl ">
          <Toaster />
          {/* signin/registerpage */}
          <div className="w-full">
            <form className="px-16">
              <div className="py-2">
                <label htmlFor="name" className="font-bold">
                  Name:
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={handleNameChange}
                  className="w-full p-3 rounded-md my-4 "
                  required
                />
              </div>
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
                onClick={handleSignUp}
              >
                Sign Up
              </button>
            </form>
            <div className=" flex flex-col justify-center items-center">
              <p className="mb-2 mt-6">
                Already registered?{" "}
                <Link to="/signin" className="font-bold cursor-pointer">
                  Go to log In
                </Link>
              </p>
              <p className=" my-2">Or sign up with</p>
              <div className="flex justify-center gap-10 my-4">
                <AiFillGoogleCircle className="text-3xl" />
                <FaFacebook className="text-3xl" />
                <FaMicrosoft className="text-3xl" />
              </div>
            </div>
            <div className="flex justify-center items-center py-6">
              <ReCAPTCHA sitekey={recaptchaSiteKey} onChange={onChange} />
            </div>
          </div>

          {/* image */}
          <div className="hidden md:block">
            <img src={authenticationImg} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
