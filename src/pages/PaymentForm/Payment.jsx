import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import useSelectedClass from "../../hooks/useSelectedClass";
import PaymentForm from "./PaymentForm";

// TODO: provide publishable Key
const stripePromise = loadStripe(import.meta.env.VITE_stripe_publish_key);
const Payment = () => {
    const [selectedClass] = useSelectedClass();
    console.log(selectedClass)
    
    return (
        <div>
            
            <h2 className="text-3xl"> {selectedClass.price}</h2>
            <Elements stripe={stripePromise}>
                <PaymentForm cart={selectedClass} price={selectedClass.price}></PaymentForm>
            </Elements>
        </div>
    );
};

export default Payment;