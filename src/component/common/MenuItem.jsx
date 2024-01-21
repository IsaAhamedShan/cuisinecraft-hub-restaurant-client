import React from 'react';

const MenuItem = ({itemsList}) => {
const {name,price,recipe,image,category}=itemsList
    return (
        <div className='flex gap-5  px-2 md:px-4 lg:px-0'>
            <div className='flex-shrink-0 flex justify-center items-center'><img className='w-[118px] h-[104px] rounded-r-full rounded-bl-full' src={image} alt="" /></div>
            <div className=''>
                <h1 className='text-xl pb-3 hidden lg:block'>{name}    -----------------</h1>
                <h1 className='text-xl pb-3  lg:hidden'>{name}</h1>
                <p className='text-normal'>{recipe}</p>
            </div>
            <div className='flex-shrink-0'><p className='mt-6 md:mt-0 text-[#BB8506]'>${price}</p></div>
        </div>
    );
};

export default MenuItem;