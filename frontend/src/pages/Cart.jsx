import { useEffect } from "react";
import { useState } from "react";
import {VscError} from "react-icons/vsc"
import CartItemCard from "../components/CartItem";
import {Link} from "react-router-dom";
import { useSelector , useDispatch } from "react-redux";
import { addToCart,removeToCart,calculatePrice, discountApplied } from "../redux/reducer/cartReducer";
import axios from "axios";


const Cart = () => {


  const {
    cartItems,subtotal,tax,total,shippingCharges,discount} = useSelector((state) => state.cartReducer);



  const [couponCode, setCouponCode] = useState("");
  const [isValidCouponCode, setIsValidCouponCode] = useState(false);
   
   const dispatch = useDispatch()

  const incrementHandler = (cartItem) => {

    if(cartItem.quantity >= cartItem.stock)return;

      dispatch(addToCart({...cartItem,quantity : cartItem.quantity+1}));
  }

  const decrementHandler = (cartItem) => {

    if(cartItem.quantity < 0)return;

    dispatch(addToCart({...cartItem,quantity : cartItem.quantity-1}));
}

const removeHandler = (productId) => {
  dispatch(removeToCart(productId));
}

const server = `http://localhost:4000`

  // First useEffect for handling discount coupon:
useEffect(()=> {

  const {token,cancel} = axios.CancelToken.source() 


  const timeOutId = setTimeout(() => {

    axios.get(`${server}/api/v1/cart/payment/discount?coupon=${couponCode}`)
    .then((res) => {
      dispatch(discountApplied(res.data.discount)); 
      dispatch(calculatePrice());
      setIsValidCouponCode(true);
    })
    .catch((e) => {
      console.log(e.response.data.message);    
      dispatch(calculatePrice());   
      dispatch(discountApplied(0));  // Reset discount properly
      setIsValidCouponCode(false);
    });

  }, 1000);

  return () => {
    clearTimeout(timeOutId);
    cancel()
    setIsValidCouponCode(false);
  };
}, [couponCode]);

// Second useEffect for recalculating price when cartItems change:
useEffect(()=> {
  dispatch(calculatePrice());  // Dispatch calculatePrice action
}, [cartItems]);


  return (
    <div className="cart">
      <main>
        {cartItems.length > 0 ?
          cartItems.map((i,idx)=>{
          return  <CartItemCard key={idx} cartItem={i} incrementHandler={incrementHandler} decrementHandler={decrementHandler} removeHandler={removeHandler} />
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
