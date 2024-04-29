import { createContext, useEffect } from "react";
import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase/firebase.config";
import useAxiosPublic from "../Hooks/useAxiosPublic";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const axiosPublic = useAxiosPublic();
  const [user, setUser] = useState(null);
  const [loading,setLoading] = useState(true);
  const register = (email, password) => {
    setLoading(true)
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const login = (email, password) => {
    setLoading(true)
    return signInWithEmailAndPassword(auth, email, password);
  };
  const logout = () => {
    setLoading(true)
    return signOut(auth);
  };
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser);
      if (currentUser) {
        const userInfo = { email: currentUser.email };
        axiosPublic.post("/jwt", userInfo).then(res => {
          if (res.data.token) {
            console.log("setting the access token to localdb.")
            localStorage.setItem("access-token", res.data.token);
            setLoading(false)
          }
        });
      } else {
        // console.log("removing access token from local db")
        // localStorage.removeItem("access-token");
        setLoading(true)
      }
      console.log("Current User: ", user);
    });
    return () => {
      unSubscribe();
    };
  },[axiosPublic,user]);
  const authInfo = { user, register, login, logout,loading };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
