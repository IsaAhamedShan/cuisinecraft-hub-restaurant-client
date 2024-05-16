import React from "react";
import { FaPhoneSquare } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

import { GoClockFill } from "react-icons/go";


const ContactCard = ({ data }) => {
  const { mobile_number, address, working_hours } = data[0];
  return (
    <div className="flex flex-wrap justify-center items-center gap-6 max-w-7xl m-auto">
      <div className="w-96 h-72 border-2 hover:border-slate-400">
      <div className="flex justify-center items-center   bg-[#A0DEFF]   py-4">
        <FaPhoneSquare className="text-4xl" />
      </div>
      <div className="m-3">
        <div className="flex flex-col justify-center items-center gap-4 bg-slate-200 pt-6 pb-20 ">
          <h1 className="text-3xl">PHONE</h1>
          <p className="text-xl">{data && mobile_number}</p>
        </div>
      </div>
    </div>
    <div className="w-96 h-72 border-2 hover:border-slate-400">
      <div className="flex justify-center items-center   bg-[#A0DEFF]   py-4">
      
        <FaLocationDot className="text-4xl" />
      </div>
      <div className="m-3">
        <div className="flex flex-col justify-center items-center gap-4 bg-slate-200 pt-6 pb-20 ">
          <h1 className="text-3xl">ADDRESS</h1>
          <p className="text-xl">{data && address}</p>
        </div>
      </div>
    </div>
    <div className="w-96 h-72 border-2 hover:border-slate-400">
      <div className="flex justify-center items-center   bg-[#A0DEFF]   py-4">
        <GoClockFill className="text-4xl" />
      </div>
      <div className="m-3">
        <div className="flex flex-col justify-center items-center gap-4 bg-slate-200 pt-6 pb-16">
          <h1 className="text-3xl">WORKING HOURS</h1>
          <p className="text-xl text-center w-64">{data && working_hours}</p>
        </div>
      </div>
    </div>
    </div>
  );
};

export default ContactCard;
