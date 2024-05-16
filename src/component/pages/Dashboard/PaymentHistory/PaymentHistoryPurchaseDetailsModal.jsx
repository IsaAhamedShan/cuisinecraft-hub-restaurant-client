import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const PaymentHistoryPurchaseDetailsModal = ({ item }) => {
  console.log("item  in purchase details: ", item);
  const axiosSecure = useAxiosSecure();
  const [purchaseData, setPurchaseData] = useState(null);

  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    axiosSecure
      .get(`/paymentHistoryPurchaseDetails?items=${item.menuItemId}`)
      .then(res => {
        console.log("paymentHistoryPurchaseDetails :", res);
        setPurchaseData(res.data);
        setIsLoading(false);
      })
      .catch(err => {
        console.log(err);
      });
  }, [axiosSecure, item.menuItemId]);

  if (isLoading)
    return (
      <div className="flex justify-center items-center">
        <p className="text-5xl text-center">Loading...</p>
      </div>
    );
  return (
    <div className="">
      <div className="overflow-x-auto max-w-5xl mx-auto max-h-[300px]">
        <table className="table ">
          {/* head */}
          <thead className="   bg-[#A0DEFF]   ">
            <tr className="">
              <th className="py-6 text-white  md:text-xl ">Name</th>
              <th className="py-6 text-white  md:text-xl ">Category</th>
              <th className="py-6 text-white pl-5 md:text-xl ">price</th>
            </tr>
          </thead>
          <tbody className="">
            {purchaseData &&
              purchaseData.map((element, idx) => {
                return (
                  <tr key={idx}>
                    <td>
                      <div className=" text-black">
                        {element.name}
                        <br />
                      </div>
                    </td>
                    <td className="px-4 text-black md:px-4">
                      {element.category}
                    </td>
                    <td className="px-4 text-black md:px-4">
                      ${element.price}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistoryPurchaseDetailsModal;
