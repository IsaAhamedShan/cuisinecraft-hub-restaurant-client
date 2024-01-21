import { Helmet } from "react-helmet-async";
import Cover from "../../common/Cover";
import banner3 from "../../../assets/menu/banner3.jpg"
const OurMenu = () => {

    const coverDetails ={
image: banner3,
heading:"OUR MENU",
text:"Would you like to take a dish?"
    }
    return (
        <div>
      <Helmet>
        <title>CuisineCraft-Hub | Our Menu</title>
      </Helmet>
            <Cover coverDetails={coverDetails}></Cover>
            
        </div>
    );
};

export default OurMenu;