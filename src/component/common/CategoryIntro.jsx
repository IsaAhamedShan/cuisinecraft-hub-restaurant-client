import { Parallax } from "react-parallax";
const CategoryIntro = ({ categoryIntroInfo }) => {
  const {
    backgroundColor,
    opacity,
    heading,
    description,
    textColor,
    backgroundImg,icon
  } = categoryIntroInfo;
  return (
    <div>

      <Parallax
        blur={{ min: -15, max: 15 }}
        bgImage={backgroundImg}
        bgImageAlt="the dog"
        strength={-200}
        className="p-auto my-32"
      >
        <div className="flex justify-center items-center h-[350px] md:h-[600px] lg:h-[700px]">
          <div
            className={`flex flex-col justify-center items-center gap-6 py-12 px-4 xl:px-28 ${backgroundColor} ${opacity}  md:px-0 md:py-28 md:max-w-3xl xl:max-w-5xl m-auto ${textColor}`}
          >
            <h1 className="text-4xl text-center flex gap-4 justify-center items-center">{heading} {icon}</h1>
            <p className={`max-w-3xl text-center ${textColor}`}>{description}</p>
          </div>
          {/* <div style={{ height: "400px" }} /> */}
        </div>
      </Parallax>
    </div>
  );
};

export default CategoryIntro;
