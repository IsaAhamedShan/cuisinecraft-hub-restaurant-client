import React from "react";

const ItemCard = ({ item }) => {
  const { image, name, recipe } = item;
  return (
    <div>
      <div className="card w-[400px] h-[541px] shadow-xl rounded-sm hover:scale-105 duration-200 cursor-pointer bg-gray-200 ">
        <figure>
          <img
            src={image}
            alt="Shoes"
            className="rounded-none min-w-[400px] min-h-[300px]"
          />
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title text-2xl font-semibold font-raleway">{name}</h2>
          <p className="text-normal font-roboto">{recipe}</p>
          <div className="card-actions">
            <button className="btn btn-wide rounded-md text-[#BB8506]  text-2xl  bg-gray-300 hover:bg-[#1F2937] border-b-4 border-x-0 border-t-0 border-yellow-700 hover:border-gray-500">
              Add to Cart!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
