import { useEffect, useState } from "react";
import SectionIntro from "../../../common/SectionIntro";

import ReviewCard from "../../../common/ReviewCard";
import { Swiper, SwiperSlide } from "swiper/react";


import "swiper/css";
import "swiper/css/navigation";


import { Navigation } from "swiper/modules";

import useAxiosPublic from "../../../Hooks/useAxiosPublic";
const ReviewSection = () => {
  const axiosPublic = useAxiosPublic()
  const [data, setData] = useState([]);
  useEffect(() => {
    axiosPublic
      .get("/review")
      .then(res => {
        setData(res.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [axiosPublic]);
  return (
    <div className="max-w-7xl m-auto my-20">
      <SectionIntro
        heading={"What Our Client Say"}
        text={"TESTIMONIALS"}
      ></SectionIntro>

      <Swiper navigation={true} modules={[Navigation]} className="mySwiper" loop="true">
        {data && data?.map(item => (
          <SwiperSlide key={item._id}>
            <ReviewCard item={item}></ReviewCard>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ReviewSection;
