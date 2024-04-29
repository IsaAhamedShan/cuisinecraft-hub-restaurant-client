import axios from "axios";
import  { useContext } from "react";
import {useNavigate} from 'react-router-dom'
import { AuthContext } from "../provider/AuthProvider";
const axiosSecure = axios.create({
  baseURL: "http://localhost:5000/",
  // withCredentials:true
});
const useAxiosSecure = () => {
  const accessToken = localStorage.getItem("access-token")
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
  //request interceptor to add authorization header for every secure call to the api
  if(accessToken){
    axiosSecure.interceptors.request.use(
      config => {
        // console.log(res)
        console.log(`token: ${localStorage.getItem(
          "access-token"
        )}`,)
        config.headers.authorization = `Bearer ${localStorage.getItem(
          "access-token"
        )}`;
          console.log("insider interceptor, config :", config);
        return config;
      },
      error => {
        if (error.status === (401 || 403)) {
          console.log("error status is ", error.status);
          console.log("logOut user.");
        } else {
          console.log("error status is ", error.status);
        }
      }
    );
  }
  axiosSecure.interceptors.response?.use(
    response => {
      return response;
    },
   async error => {
      const status = error.response.status;
    //   console.log("🚀 ~ useAxiosSecure ~ status:", status);
      if (status == (401 || 403)) {
        await logout()
          .then(() => {
            console.log("user logged out because of authorization issue");
          })
          .catch(() => {
            console.log("error while logging out in interceptor response");
          });
        navigate("/signin");
      }

      return Promise.reject(error);
    }
  );
  return axiosSecure;
};

export default useAxiosSecure;
