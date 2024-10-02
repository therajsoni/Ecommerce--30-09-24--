import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import {VscError} from "react-icons/vsc"
import CartItem from "../components/CartItem";
import Macbook from '../assets/Macbook.jpg'
import {Link} from "react-router-dom";

const cartItems = [
  {
    productId : "a",
    photo : Macbook,
    name : "Macbook",
    price : 3000000,
    quantity : 4,
    stock : 10,

  }
];
const subtotal = 4000;
const tax = Math.round(subtotal * 0.18);
const shippingCharges = 200;
const total = subtotal + tax + shippingCharges;
const discount = 4;

const Cart = () => {
  const [couponCode, setCouponCode] = useState("");
  const [isValidCouponCode, setIsValidCouponCode] = useState(false);

  useEffect(()=>{

    const timeOutId = setTimeout(() => {
    if(Math.random() > 0.5)setIsValidCouponCode(true)
    else setIsValidCouponCode(false)    
    },1000);

    return()=>{
      clearTimeout(timeOutId);
      setIsValidCouponCode(false);
    }

  },[couponCode])

  return (
    <div className="cart">
      <main>
        {cartItems.length > 0 ?
          cartItems.map((i,idx)=>{
          return  <CartItem key={idx} cartItem={i} />
          }
          )
          :
          <h1>No Items Added</h1>
        }
      </main>
      <aside>
        <p>SubTotal : ${subtotal} </p>
        <p>Shipping Charges : ${shippingCharges} </p>
        <p>Tax : ${tax} </p>
        <p>
          Discount - <em className="red">${discount}</em>
        </p>
        <p>
          <b>Total : ${total}</b>
        </p>
        <input
          type="text"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
          placeholder="Coupon Code"
        />
{
  couponCode && (isValidCouponCode ? (
    <span className="green">
      ${discount} off using the <code>${couponCode}</code>
    </span>
  ) : (
    <span className="red">InValid Coupon <VscError/> </span>
  ))
}

{
cartItems.length > 0 && <Link to={"/shipping"}>Checkout</Link>
}


      </aside>
    </div>
  );
};

export default Cart;
