import {
  CardElement,
  useElements,
  useStripe
} from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from '../../../Hooks/useAxiosSecure.jsx';
import useCart from '../../../Hooks/useCart'
const CheckoutForm =  () => {
  const stripe = useStripe();
  const elements = useElements();
const [error,setError] = useState();
const axiosSecure = useAxiosSecure();
const [cart,refetch] = useCart();
console.log("🚀 ~ CheckoutForm ~ cart:", cart)

const [clientSecret,setClientSecret] = useState()
const totalPrice = cart.reduce((accumulator,current)=>accumulator+=current.price,0)
console.log("🚀 ~ CheckoutForm ~ price:",totalPrice)

// useEffect( ()=>{
// axiosSecure.post('/create-payment-intent',{price:totalPrice})
// .then(res=>{
//   console.log(res.data.clientSecret)
//   setClientSecret(res.data.clientSecret)
// })

// },[axiosSecure,totalPrice])

  const handleSubmit = async e => {
    e.preventDefault();
  
  if (!stripe && !elements) {
    return;
  }
  const card = elements.getElement(CardElement);
  if (card === null) return;
  const { error, paymentMethod } = await stripe.createPaymentMethod({
    type: "card",
    card,
  });
  if (error) {
    console.log("payment error ", error);
    setError(error.message)
  } else {
    console.log("payment method ", paymentMethod);
    setError(null)
  }
}
  return (
    <div>
      <form className="max-w-5xl my-10 m-auto" onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <button className="btn btn-primary" type="submit" disabled={!stripe || !clientSecret}>
        Pay
      </button>
    </form>
    {
      error && <p>Error:${error}</p>
    }
    
    </div>

  );
};

export default CheckoutForm;
