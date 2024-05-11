import React, { useEffect } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const PaymentHistoryPurchaseDetailsModal = ({ item }) => {
  console.log("item  in purchase details: ", item);
  const axiosSecure = useAxiosSecure();
  // useEffect(() => {
  //   axiosSecure
  //     .get(`/paymentHistoryPurchaseDetails?items=${item.menuItemId}`)
  //     .then(res => {
  //       console.log(res);
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // }, [axiosSecure, item.menuItemId]);
  return (
    <div>
      <p>{item._id}</p>
      {item.menuItemId.map((element, idx) => {
        return <div key={idx}>{element}</div>;
      })}
    </div>
  );
};

export default PaymentHistoryPurchaseDetailsModal;
