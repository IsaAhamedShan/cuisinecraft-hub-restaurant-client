import {
  CardElement,
  PaymentElement,
  useElements,
  useStripe
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const CheckoutForm =  () => {
  const stripe = useStripe();
  const elements = useElements();

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
  } else {
    console.log("payment method ", paymentMethod);
  }
}
  return (
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
      <button className="btn btn-primary" type="submit" disabled={!stripe}>
        Pay
      </button>
    </form>
  );
};

export default CheckoutForm;
