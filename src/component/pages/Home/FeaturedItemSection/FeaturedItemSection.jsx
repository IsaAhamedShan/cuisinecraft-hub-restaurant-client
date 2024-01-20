import backgroundFeauturedItem from "../../../../assets/home/featured.jpg";
import SectionIntro from "../../../common/SectionIntro";
const FeaturedItemSection = () => {
  return (
    <div
      className="min-h-[100vh] md:min-h-[145vh] lg:min-h-[145vh] xl:min-h-[100vh] h-max bg-fixed my-20"
      style={{
        backgroundImage: `url(${backgroundFeauturedItem})`,
        // backgroundSize: "cover",
        // backgroundRepeat: "repeat"
        // backgroundSize: "100% 100%"
      }}
    >

        <div className="absolute bg-black bg-opacity-50 w-full min-h-[100vh] md:min-h-[145vh] lg:min-h-[145vh] xl:min-h-[100vh] flex flex-col justify-center items-center py-10">
        <SectionIntro
          heading={"Featured Item"}
          text={"FROM OUR MENU"}
          textColor={"text-white"}
        >
          {" "}
        </SectionIntro>
        <div
          className="flex flex-wrap justify-center items-center max-w-7xl mx-auto gap-6 my-4 md:my-14
        "
        >
          <div className="w-fit h-fit p-4 mx-auto">
            <img
              src={backgroundFeauturedItem}
              className=" lg:max-w-[620px] lg:max-h-[380px] "
              alt=""
            />
          </div>
          <div className="flex justify-center items-center">
            <div className="flex flex-col justify-center items-start m-auto max-w-[604px]">
              <p className="text-white py-2 m-auto md:m-0">10 MARCH,2023</p>
              <h3 className="text-2xl text-white py-2 m-auto md:m-0">
                Where I can get some?
              </h3>
              <p className="text-normal text-white py-3 text-center md:text-left m-auto md:m-0" >
                March 20, 2023 WHERE CAN I GET SOME? Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Error voluptate facere, deserunt
                dolores maiores quod nobis quas quasi. Eaque repellat recusandae
                ad laudantium tempore consequatur consequuntur omnis ullam
                maxime tenetur.
              </p>
              <button className="btn text-xl btn-wide btn-outline text-white hover:bg-slate-900 hover:bg-opacity-50 mt-4 rounded-sm m-auto md:m-0">
                Read More
              </button>
            </div>
          </div>
        </div>
      </div>
      </div>
  );
};

export default FeaturedItemSection;
