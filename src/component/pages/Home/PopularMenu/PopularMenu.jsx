import React, { useEffect, useState } from "react";
import SectionIntro from "../../../common/SectionIntro";
import axios from "axios";
import MenuItem from "../../../common/MenuItem";
const PopularMenu = () => {
  const [popularItems, setPopularItems] = useState([]);
  useEffect(() => {
    axios
      .get("menu.json")
      .then(res => {
        console.log(res.data);
        const filteredData = res.data.filter(
          items => items.category === "popular"
        );
        setPopularItems(filteredData);
        console.log(filteredData);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);
  return (
    <div className="py-5 md:py-10 max-w-7xl m-auto">
      <SectionIntro
        heading={"Popular Items"}
        text={"FROM OUR MENU"}
      ></SectionIntro>
      <div className="grid grid-cols-1 py-5 md:py-10 md:grid-cols-2 justify-center items-center gap-10 ">
        {popularItems.map(item => (
          <MenuItem key={item._id} itemsList={item}></MenuItem>
        ))}
      </div>
    </div>
  );
};

export default PopularMenu;
