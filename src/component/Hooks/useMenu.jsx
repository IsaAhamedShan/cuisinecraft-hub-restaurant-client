import { useEffect, useState } from "react";
import axios from "axios";
const useMenu = (categoryName) => {
  const [data, setData] = useState([]);
  const [loading,setLoading] = useState(true)
//   console.log(categoryName)
  useEffect(() => {
    // setLoading(true)
    axios
      .get("menu.json")
      .then(res => {
        console.log("menu data is ", res.data);
        const filteredData = res.data.filter(item=> item.category === categoryName)
        console.log(filteredData)
        setData(filteredData)
        setLoading(false)
      })
      .catch(error => {
        console.log(error);
        setLoading(true)
      });
  }, []);
  return [data,loading]
};


export default useMenu;
