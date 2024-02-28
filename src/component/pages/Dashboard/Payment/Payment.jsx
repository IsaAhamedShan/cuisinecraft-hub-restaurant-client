import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import SectionIntro from "../../../common/SectionIntro.jsx";
import CheckoutForm from "./CheckoutForm.jsx";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY);

const Payment = () => {
  // const options = {
  //   // passing the client secret obtained from the server
  //   clientSecret: "{{CLIENT_SECRET}}",
  // };
  return (
    <div>
      <SectionIntro
        heading="PAYMENT"
        text="Please, Pay to get foods"
      ></SectionIntro>
      <Elements stripe={stripePromise} 
      // options={options}
      >
        <CheckoutForm />
      </Elements>
    </div>
  );
};

export default Payment;
