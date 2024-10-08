import { useEffect, useState } from "react";
import {BiArrowBack} from "react-icons/bi"
import {useNavigate} from "react-router-dom"
import {useSelector} from "react-redux"

const Shipping = () => {
 
  const {cartItems} = useSelector(state => state.cartReducer)


  const navigate = useNavigate();


 const [shippingInfo, setShippingInfo] = useState({
  address : "",
  city : "",
  state : "",
  country:"",
  pinCode:""
 }) 

 const changeHandler = (e) => {
  setShippingInfo(prev => ({...prev,[e.target.name] : e.target.value}))
 }


 useEffect(()=>{
   
    if(cartItems.length <= 0){
     return navigate("/cart")
    }
 },[cartItems])



 return <div className="shipping">
<button className="back-btn" onClick={()=>navigate("/cart")}>
  <BiArrowBack/>
</button>
<form>


  <h1>Shipping Address</h1>
  <input required type="text" placeholder="Address" name="address" value={shippingInfo.address} onChange={changeHandler} />
  <input required type="text" placeholder="city" name="city" value={shippingInfo.city} onChange={changeHandler} />
  <input required type="text" placeholder="state" name="state" value={shippingInfo.state} onChange={changeHandler} />
  <select name="country" required value={shippingInfo.country} onChange={changeHandler}>
  <option value={""}>Choose Country</option>
  <optgroup label="Koria">
    <option>South Koria</option>
    <option>North Koria</option>
  </optgroup>
  <optgroup label="US">
    <option>NORTH US</option>
    <option>SOUTH US</option>
  </optgroup>
  <option>India</option>
  </select>
  <input required type="number" placeholder="pinCode" name="pinCode" value={shippingInfo.pinCode} onChange={changeHandler} />
  <button type="submit" >Pay Now</button>
  </form>
  </div>;
};

export default Shipping;
