import { useEffect, useState } from "react";
import axios from "axios";
const useMenu = categoryName => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  //   console.log(categoryName)
  useEffect(() => {
    // setLoading(true)
    axios
      .get("../../../public/menu.json")
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
