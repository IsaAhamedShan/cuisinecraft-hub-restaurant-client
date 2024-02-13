import { useEffect, useState } from "react";
import axios from "axios";
import useAxiosSecure from "./useAxiosSecure";
import useAxiosPublic from "./useAxiosPublic";
const useMenu = categoryName => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  //   console.log(categoryName)
  const axiosPublic = useAxiosPublic()
  useEffect(() => {
    // setLoading(true)
    axiosPublic
      .get("/menu")
      .then(res => {
        console.log("menu data is ", res.data);
        const filteredData = categoryName
          ? res.data.filter(item => item.category === categoryName)
          : res.data;
        setData(filteredData);
      })
      .catch(error => {
        console.log("error from useMEnu hook :", error);
        setLoading(true);
      });
  }, [categoryName]);
  return [data, loading];
};

export default useMenu;
