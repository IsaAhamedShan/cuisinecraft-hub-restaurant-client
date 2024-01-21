import React from "react";
import Banner from "./Banner/Banner";
import Category from "./Category/Category";
import SectionIntro from "../../common/SectionIntro";
import CategoryIntro from "../../common/CategoryIntro";
import PopularMenu from "./PopularMenu/PopularMenu";
import ChefRecommendation from "./ChefRecommendation/ChefRecommendation";
import FeaturedItemSection from "./FeaturedItemSection/FeaturedItemSection";
import ReviewSection from "./ReviewSection/ReviewSection";
import { Helmet } from "react-helmet-async";
import restaurantbg from '../../../assets/others/restaurantbg.png'
const Home = () => {
  const categoryIntroInfo = {
    backgroundColor: "bg-white",
    opacity: "opacity-100",
    heading: "CUISINECRAFT HUB",
    description:
      "CuisineCraft Hub is an epicurean sanctuary, blending gastronomic mastery with a warm communal embrace. Indulge in an extraordinary culinary journey, where delectable creations harmonize with conviviality, crafting an ambiance that transforms dining into an unforgettable celebration of taste and togetherness",
    textColor: "black",
    backgroundImg:restaurantbg
  };
  return (
    <div>
      <Helmet>
        <title>CuisineCraft-Hub | Home</title>
      </Helmet>
      {/* <Navbar></Navbar> */}
      <Banner></Banner>
      {/* <SectionIntro heading={}></SectionIntro> */}
      <Category></Category>
      <CategoryIntro categoryIntroInfo={categoryIntroInfo}></CategoryIntro>
      <PopularMenu></PopularMenu>
      <ChefRecommendation></ChefRecommendation>
      <FeaturedItemSection></FeaturedItemSection>
      <ReviewSection></ReviewSection>
    </div>
  );
};

export default Home;
