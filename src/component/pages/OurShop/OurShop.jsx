import { Helmet } from "react-helmet-async";
import banner2 from "../../../assets/shop/banner2.jpg";
import Cover from "../../common/Cover";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import useMenu from "../../Hooks/useMenu";
import ItemCard from "../../common/ItemCard";
import { useState } from "react";
import { useParams } from "react-router-dom";
const OurShop = () => {
    const arr = ["salad", "pizza", "soup", "dessert"];
    const { categoryName } = useParams();
    console.log("category name: " + categoryName);
    const [tabIndex, setTabIndex] = useState(arr.indexOf(categoryName));
    const [data] = useMenu("");
    console.log("data is:",data)
    const dessert = data.filter(item => item.category === "dessert");
    const salad = data.filter(item => item.category === "salad");
    const pizza = data.filter(item => item.category === "pizza");
    const soup = data.filter(item => item.category === "soup");
    const coverDetails = {
      image: banner2,
      heading: "OUR SHOP",
      text: "WOULD YOU LIKE TO TRY A DISH?",
    };
  console.log(dessert,salad,pizza,soup)

  return (
    <div>
      <Helmet>
        <title>CuisineCraft-Hub | Our Shop</title>
      </Helmet>
      <Cover coverDetails={coverDetails}></Cover>
      <Tabs 
      selectedIndex={tabIndex} onSelect={index => setTabIndex(index)}
      >
        <TabList>
          <Tab>Salad</Tab>
          <Tab>Pizza</Tab>
          <Tab>Soup</Tab>
          <Tab>Desserts</Tab>
        </TabList>

        <TabPanel>
          <div className="flex flex-wrap gap-8 justify-center items-center py-20">
            {salad.map(item => (
              <ItemCard key={item._id} item={item}></ItemCard>
            ))}
          </div>
        </TabPanel>
        <TabPanel>
          <div className="flex flex-wrap gap-8 justify-center items-center py-20">
            {pizza.map(item => (
              <ItemCard key={item._id} item={item}></ItemCard>
            ))}
          </div>
        </TabPanel>
        <TabPanel>
          <div className="flex flex-wrap gap-8 justify-center items-center py-20">
            {soup.map(item => (
              <ItemCard key={item._id} item={item}></ItemCard>
            ))}
          </div>
        </TabPanel>
        <TabPanel>
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
