import React, { useEffect, useState } from "react";
import SectionIntro from "../../../common/SectionIntro";
import axios from "axios";
import ReviewCard from "../../../common/ReviewCard";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import './styles.css'
import { Navigation } from "swiper/modules";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
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
  }, []);
  return (
    <div className="max-w-7xl m-auto my-20">
      <SectionIntro
        heading={"What Our Client Say"}
        text={"TESTIMONIALS"}
      ></SectionIntro>

      <Swiper navigation={true} modules={[Navigation]} className="mySwiper" loop="true">
        {data.map(item => (
          <SwiperSlide key={item._id}>
            <ReviewCard item={item}></ReviewCard>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ReviewSection;
