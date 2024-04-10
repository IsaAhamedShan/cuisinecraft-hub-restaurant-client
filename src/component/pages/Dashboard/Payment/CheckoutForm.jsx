import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure.jsx";
import useCart from "../../../Hooks/useCart";
import { AuthContext } from "../../../provider/AuthProvider.jsx";
const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState();
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const [cart, refetch] = useCart();
  const [transactionId, setTransactionId] = useState("");

  console.log("🚀 ~ CheckoutForm  ~ cart:", cart);

  const [clientSecret, setClientSecret] = useState();
  const totalPrice = cart.reduce(
    (accumulator, current) => (accumulator += parseInt(current.price)),
    0
  );
  console.log("🚀 ~ CheckoutForm ~ price:", totalPrice);
  useEffect(() => {
    if (totalPrice > 0) {
      axiosSecure
        .post("/create-payment-intent", { price: totalPrice })
        .then(res => {
          console.log("client secret from /create-payment-intent: ", res.data.clientSecret);
          setClientSecret(res.data.clientSecret);
        });
    }
  }, [axiosSecure, totalPrice]);

  const handleSubmit = async e => {
    e.preventDefault();
    console.log(user?.email, user?.displayName);

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
      setError(error.message);
    } else {
      console.log("payment method ", paymentMethod);
      setError(null);
    }
    // confirming payment
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.displayName || "anonymous",
          },
        },
      });
    if (confirmError) {
      console.log("error while confirming card", confirmError);
    } else {
      console.log("successful payment intent ", paymentIntent);
      if (paymentIntent.status === "succeeded") {
        console.log("paymentIntent transaction id:", paymentIntent.id)
        setTransactionId(paymentIntent.id);
      }

      //saving info to db;
      const payment = {
        email: user.email,
        price: totalPrice,
        transactionId: paymentIntent.id,
        date: new Date(), //have to convert the date to utc format (use moment js to convert)
        cartItemId: cart.map(item => item._id),
        menuItemId: cart.map(item => item.menuId),
        status: "pending",
      };
      const res = await axiosSecure.post("/payments", payment);
      console.log(res);
    }
  };
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
        <button
          className="btn btn-primary"
          type="submit"
          disabled={!stripe || !clientSecret}
        >
          Pay
        </button>
      </form>
      {error && <p>Error:${error}</p>}
      {transactionId && <p>Your transaction id: {transactionId}</p>}
    </div>
  );
};

export default CheckoutForm;
