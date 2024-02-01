import React, { useContext, useEffect, useState } from "react";
import useCart from "../../Hooks/useCart";
import { AuthContext } from "../../provider/AuthProvider";

const Cart = () => {
  const [cart] = useCart();
  console.log("cart is:", cart);
 
  const { user } = useContext(AuthContext);
 

  return <div>{cart && <p>usercart length : {cart.length}</p>}</div>;
};

export default Cart;
