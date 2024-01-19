import { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

import slide1 from "../../../../assets/home/slide1.jpg";
import slide2 from "../../../../assets/home/slide2.jpg";
import slide3 from "../../../../assets/home/slide3.jpg";
import slide4 from "../../../../assets/home/slide4.jpg";
import slide5 from "../../../../assets/home/slide5.jpg";

// import required modules
import { FreeMode, Pagination } from "swiper/modules";
import SectionIntro from "../../../common/SectionIntro";
const Category = () => {
  const breakpoints = {
    0: {
      slidesPerView: 1,
    },
    640: {
      slidesPerView: 2, // You can adjust this based on your needs
    },
    768: {
      slidesPerView: 3,
    },
    1280: {
      slidesPerView: 4,
    },
  };
  const heading = "---From 11:00am to 10:00pm---";
  const text = ["ORDER ONLINE"];
  return (
    <div>
      <SectionIntro heading={heading} text={text}></SectionIntro>
      <Swiper
        // slidesPerView={slidesPerPage}
        breakpoints={breakpoints}
        spaceBetween={30}
        freeMode={true}
        pagination={{
          clickable: true,
        }}
        modules={[FreeMode, Pagination]}
        className="mySwiper max-w-7xl my-6 md:my-10 lg:my-20"
      >
        <SwiperSlide>
          <img src={slide1} alt="" />
          <h3 className="font-bold text-center pr-5 text-xl md:text-3xl -mt-20">
            SALAD
          </h3>
        </SwiperSlide>
        <SwiperSlide>
          <img src={slide2} alt="" />
          <h3 className="font-bold text-center pr-5 text-xl md:text-3xl -mt-20">
            PIZZA
          </h3>
        </SwiperSlide>
        <SwiperSlide>
          <img src={slide3} alt="" />
          <h3 className="font-bold text-center pr-5 text-xl md:text-3xl -mt-20">
            SOUP
          </h3>
        </SwiperSlide>
        <SwiperSlide>
          <img src={slide4} alt="" />
          <h3 className="font-bold text-center pr-5 text-xl md:text-3xl -mt-20">
            DESERT
          </h3>
        </SwiperSlide>
        <SwiperSlide>
          <img src={slide5} alt="" />
          <h3 className="font-bold text-center pr-5 text-xl md:text-3xl -mt-20">
            SALAD{" "}
          </h3>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Category;
