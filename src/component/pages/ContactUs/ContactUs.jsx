import { Helmet } from "react-helmet-async";
import contactUsbg from "../../../assets/contact/contactUsBg.jpg";
import Cover from "../../common/Cover";
import SectionIntro from "../../common/SectionIntro";
import ContactInfo from "./ContactInfo";
import ContactForm from "./ContactForm";

const ContactUs = () => {
  const coverDetails = {
    image: contactUsbg,
  };
  return (
    <div>
      <Helmet>
        <title>CuisineCraft-Hub | Contact Us</title>
      </Helmet>

      <Cover coverDetails={coverDetails}></Cover>
      <ContactInfo></ContactInfo>
      <ContactForm ></ContactForm>
    </div>
  );
};

export default ContactUs;
