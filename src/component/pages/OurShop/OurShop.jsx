import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import banner2 from "../../../assets/shop/banner2.jpg";
import useMenu from "../../Hooks/useMenu";
import Cover from "../../common/Cover";
import ItemCard from "../../common/ItemCard";
import "./OurShop.css";
const OurShop = () => {
  const arr = ["salad", "pizza", "soup", "dessert"];
  const { categoryName } = useParams();
  console.log("category name: " + categoryName);
  const [tabIndex, setTabIndex] = useState(arr.indexOf(categoryName));
  const [data] = useMenu("");
  console.log("data is:", data);
  const dessert = data.filter(item => item.category === "dessert");
  const salad = data.filter(item => item.category === "salad");
  const pizza = data.filter(item => item.category === "pizza");
  const soup = data.filter(item => item.category === "soup");
  const coverDetails = {
    image: banner2,
    heading: "SHOP",
    text: "WOULD YOU LIKE TO TRY A DISH?",
  };
  console.log(dessert, salad, pizza, soup);

  return (
    <div>
      <Helmet>
        <title>CuisineCraft-Hub | Shop</title>
      </Helmet>
      <Cover coverDetails={coverDetails}></Cover>
      <Tabs selectedIndex={tabIndex} onSelect={index => setTabIndex(index)}>
        <TabList
          className={`flex justify-center gap-6 border-b-orange-300 border-2 my-8 border-t-0 px-2`}
        >
          <Tab
            className={`w-36 py-2 text-xl lg:text-2xl font-raleway border-orange-300 border-2 border-b-0 hover:cursor-pointer ${
              tabIndex === 0 ? "active-tab" : ""
            }`}
          >
            <p className="text-center">SALAD</p>
          </Tab>
          <Tab
            className={`w-36 py-2 text-xl lg:text-2xl font-raleway border-orange-300 border-2 border-b-0 text-center hover:cursor-pointer ${
              tabIndex === 1 ? "active-tab" : ""
            }`}
          >
            <p>PIZZA</p>
          </Tab>
          <Tab
            className={`w-36 py-2 text-xl lg:text-2xl font-raleway border-orange-300 border-2 border-b-0 text-center hover:cursor-pointer ${
              tabIndex === 2 ? "active-tab" : ""
            }`}
          >
            <p>SOUP</p>
          </Tab>
          <Tab
            className={`w-36 py-2 text-xl lg:text-2xl font-raleway border-orange-300 border-2 border-b-0 text-center hover:cursor-pointer ${
              tabIndex === 3 ? "active-tab" : ""
            }`}
          >
            <p>DESSERTS</p>
          </Tab>
        </TabList>

        <TabPanel className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-8 justify-center items-center py-20">
            {salad.map(item => (
              <ItemCard key={item._id} item={item}></ItemCard>
            ))}
          </div>
        </TabPanel>
        <TabPanel className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-8 justify-center items-center py-20">
            {pizza.map(item => (
              <ItemCard key={item._id} item={item}></ItemCard>
            ))}
          </div>
        </TabPanel>
        <TabPanel className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-8 justify-center items-center py-20">
            {soup.map(item => (
              <ItemCard key={item._id} item={item}></ItemCard>
            ))}
          </div>
        </TabPanel>
        <TabPanel className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-8 justify-center items-center py-20">
            {dessert.map(item => (
              <ItemCard key={item._id} item={item}></ItemCard>
            ))}
          </div>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default OurShop;
