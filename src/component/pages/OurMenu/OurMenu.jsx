import { Helmet } from "react-helmet-async";
import Cover from "../../common/Cover";
import banner3 from "../../../assets/menu/banner3.jpg";
import DessertsSection from "./DessertsSection/DessertsSection";
import PizzaSection from "./PizzaSection/PizzaSection";
import SaladSection from "./SaladSection/SaladSection";
import SoupSection from "./SoupSection/SoupSection";

const OurMenu = () => {
  const coverDetails = {
    image: banner3,
    heading: "MENU",
    text: "Would you like to take a dish?",
  };
  return (
    <div>
      <Helmet>
        <title>CuisineCraft-Hub | Menu</title>
      </Helmet>
      <Cover coverDetails={coverDetails}></Cover>
      <DessertsSection></DessertsSection>
      <PizzaSection></PizzaSection>
      <SaladSection></SaladSection>
      <SoupSection></SoupSection>
    </div>
  );
};

export default OurMenu;
