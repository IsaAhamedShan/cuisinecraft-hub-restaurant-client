import React from "react";

const Cover = ({ coverDetails }) => {
  const { image, heading, text } = coverDetails;
  console.log(coverDetails);
  return (
    <div>
      <div
        style={{
          backgroundImage: `url(${image})`,
          backgroundSize: "100% auto",
          // opacity: '0.8'
        }}
        className="h-[40vh] w-[100vw] xl:h-[100vh] xl:w-[100vw] flex justify-center items-center"
      >
        <div className="m-auto bg-black opacity-50 w-[80%] h-[40%] md:w-[70%] md:h-[45%] xl:w-[70%] xl:h-[45%] flex flex-col gap-4 justify-center items-center">
          <h1 className="text-bold text-2xl md:text-5xl xl:text-[88px] text-white">
            {heading}
          </h1>
          <p className="text-normal md:text-xl xl:text-2xl text-white">
            {text}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Cover;
