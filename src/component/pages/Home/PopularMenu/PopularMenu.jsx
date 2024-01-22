import React, { useEffect, useState } from "react";
import SectionIntro from "../../../common/SectionIntro";
import axios from "axios";
import MenuItem from "../../../common/MenuItem";
import useMenu from "../../../Hooks/useMenu";
const PopularMenu = () => {
  const [data, loading] = useMenu('popular');

  // const popularItems = data.filter(item => item.category === "popular");

  return (
    <div className="py-5 md:py-10 max-w-7xl m-auto">
      <SectionIntro
        heading={"Popular Items"}
        text={"FROM OUR MENU"}
      ></SectionIntro>
      <div>
        {/* <div className="flex justify-center items-center">
          {loading ? (
            <span className="loading loading-bars loading-lg"></span>
          ) : null}
        </div> */}
      </div>
      <div className="grid grid-cols-1 py-5 md:py-10 md:grid-cols-2 justify-center items-center gap-10 ">
        {data.map((item,index) => (
          <MenuItem key={index} itemsList={item}></MenuItem>
        ))}
      </div>
    </div>
  );
};

export default PopularMenu;
