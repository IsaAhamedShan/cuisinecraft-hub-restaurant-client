import axios from "axios";
import React, { useEffect, useState } from "react";
import ItemCard from "../../../common/ItemCard";
import SectionIntro from "../../../common/SectionIntro";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const ChefRecommendation = () => {
  const [data, setData] = useState([]);
  const axiosSecure = useAxiosSecure();
  useEffect(() => {
    axiosSecure
      .get("/chef_recommendation")
      .then(res => {
// console.log(res.data)
        setData(res.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [axiosSecure]);
  return (
    <div className="my-20">
      <SectionIntro
        heading={"Should Try"}
        text={"CHEF RECOMMENDS"}
      ></SectionIntro>
      <div className="flex justify-center items-center flex-wrap gap-6 my-5 md:py-10">
        {data.map(item => (
          <ItemCard key={item._id} item={item}></ItemCard>
        ))}
      </div>
    </div>
  );
};

export default ChefRecommendation;
