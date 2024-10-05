import {Elements, PaymentElement} from "@stripe/react-stripe-js
import { loadStripe } from "@stripe/stripe-js"
import { useState } from "react";

const stripePromise = loadStripe('pk_test_51BTUDGJAJfZb9HEBwDg86TN1KNprHjkfipXmEDMb0gSCassK5T3ZfxsAbcgKVmAIXF7oZ6ItlZZbXO6idTHE67IM007EwQ4uN3');


const CheckOutForm = () => {

    const [isProcessing,setIsProcessing] = useState(false);


    const submitHandler = () =>{

    }

    return <div className="checkout-container">
        <form onSubmit={submitHandler}>
            <PaymentElement/>
            <button>
                {
                    isProcessing ? "Processing..." : "Pay"
                }
            </button>
        </form>
    </div>
}

export default function Checkout() {
  return (
    <Elements options={{
        clientSecret : ""  // key milta hai when checkout
    }} stripe= {stripePromise}>
    <CheckOutForm/>
    </Elements>
  )
}
