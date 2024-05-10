import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import SectionIntro from "../../common/SectionIntro";
import ContactCard from "./ContactCard.jsx";
const ContactInfo = () => {
  const axiosPublic = useAxiosPublic();
  const { data, isLoading } = useQuery({
    queryKey: ["contactUs"],
    queryFn: async () => {
      const res = await axiosPublic.get("/contactUs");
      //   console.log(res)
      return res.data;
    },
  });

  // console.log("data",data);
  return (
    <div className="my-12">
      <SectionIntro heading="Visit Us" text="our Location" />
      {
        data&&<ContactCard data={data}></ContactCard>
      }
      
    </div>
  );
};

export default ContactInfo;
