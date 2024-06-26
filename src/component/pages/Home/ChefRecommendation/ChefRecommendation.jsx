import  { useEffect, useState } from "react";
import ItemCard from "../../../common/ItemCard";
import SectionIntro from "../../../common/SectionIntro";

import useAxiosPublic from "../../../Hooks/useAxiosPublic";

const ChefRecommendation = () => {
  const [data, setData] = useState([]);
  const axiosPublic = useAxiosPublic();
  useEffect(() => {
    axiosPublic
      .get("/chef_recommendation")
      .then(res => {
// console.log(res.data)
        setData(res.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [axiosPublic]);
  return (
    <div className="my-20">
      <SectionIntro
        heading={"Should Try"}
        text={"CHEF RECOMMENDS"}
      ></SectionIntro>
      <div className="flex justify-center items-center flex-wrap gap-6 my-5 md:py-10">
        {data && data?.map(item => (
          <ItemCard key={item._id} item={item}></ItemCard>
        ))}
      </div>
    </div>
  );
};

export default ChefRecommendation;
