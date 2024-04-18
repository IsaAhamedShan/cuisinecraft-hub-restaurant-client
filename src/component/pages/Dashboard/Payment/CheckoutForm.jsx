import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
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
  const navigate = useNavigate();

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
          console.log(
            "client secret from /create-payment-intent: ",
            res.data.clientSecret
          );
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
        console.log("paymentIntent transaction id:", paymentIntent.id);
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
      if (res.status === 200) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Payment Successful",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/dashboard/userHome");
      } else {
        Swal.fire({
          position: "top-end",
          icon: "warning",
          title: "Payment Unsuccessful.Try Again",
          showConfirmButton: false,
          timer: 1500,
        });
      }
      console.log(res);
    }
  };
  return (
    <div>
      <form
        className="max-w-3xl my-10 mx-4 lg:mx-auto shadow-lg p-4 md:p-6 lg:p-8"
        onSubmit={handleSubmit}
      >
        <div className="border border-gray-300 rounded-lg p-4">
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
        </div>
        <button
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded "
          type="submit"
          disabled={!stripe || !clientSecret}
        >
          Pay
        </button>
      </form>

      {/* {error && <p>Error:${error}</p>}
      {transactionId && <p>Your transaction id: {transactionId}</p>} */}
    </div>
  );
};

export default CheckoutForm;
