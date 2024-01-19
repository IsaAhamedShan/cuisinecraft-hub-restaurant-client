import React from "react";
import backgroundImg from "../../assets/home/chef-service.jpg";
const CategoryIntro = ({categoryIntroInfo}) => {
    const {backgroundColor,opacity,heading,description,textColor} = categoryIntroInfo
  return (
    <div>
      <div
      className='bg-cover bg-center  p-12 md:p-20 m-auto'
        style={{
          backgroundImage: `url(${backgroundImg})`,
        }}
      >
        <div className={`flex flex-col justify-center items-center gap-6 ${backgroundColor} ${opacity} py-6 px-4 md:px-0 md:py-28 max-w-5xl m-auto ${textColor}`}>
            <h1 className="text-4xl text-center">{heading}</h1>
            <p className={`max-w-3xl text-center ${textColor}`}>
              {description}
            </p>
        </div>
      </div>
    </div>
  );
};

export default CategoryIntro;
