import React from 'react';

const SectionIntro = ({heading,text,textColor}) => {
    return (
        <div className='flex flex-col justify-center items-center'>
            <h3 className='italic py-3 text-center text-[16px] md:text-[20px] inline text-[#D99904]'>---{heading}---</h3>
            <p className={`text-center text-[30px] md:text-[40px] py-1 my-3 border-y-4 px-6 inline m-auto border-gray-300 ${textColor? textColor:null}`}>{text}</p>
        </div>
    );
};

export default SectionIntro;