import React, { useState } from 'react'
import AdminSidebar from "../../components/AdminSidebar"
import photoShoes from "../../assets/download.jpg"
import { Link } from 'react-router-dom'

const orderItems = [
{
    name : "name",
    photo : photoShoes,
    _id : "_id",
    quantity : 2,
    price : 4330
}
]

const TransactionManagement = () => {

const [order,setOrder] = useState({
    name : "",
    address : "1",
    city : "1",
    state : "1",
    country : "1",
    pinCode: 1,
    status : "1",
    subtotal : 1,
    discount : 1,
    shippingCharges : 0,
    tax : 1,
    total : 4000 + 200 + 0 -1200,
    orderItems,
    _id : "1",             
})    

const {
    name,address,city,country,state,pinCode,subtotal,shippingCharges,tax,discount,total,status
} = order;

const updateHandler = () => {
    setOrder(prev => ({
        ...prev,status :  prev.status ==="Processing" ? "Shipped" : "Delivered",
    }))
}

  return (
    <div className="admin-container">
    <AdminSidebar/>
    <main className="product-management">
<section style={{
    padding : "2rem"
}} >
    <h2>Order Items</h2>
    {
        order.orderItems.map((i)=>(
            <ProductCard name={i.name}
                         photo={i.photo}
                         _id = {i._id}
                         quantity={i.quantity}
                         price={i.price}
                         />
        ))
    }          
</section>
<article className='shipping-info-card'>
    <h1>Order Info</h1>
    <h5>User Info</h5>
    <p>Name : {name}</p>
    <p>Address : {`${address}, ${city}, ${state}, ${country} ${pinCode}`}</p>
    <h5>Amount Info</h5>
    <p>Subtotal : {subtotal}</p>
    <p>Shipping Charges : {shippingCharges}</p>
    <p>Tax : {tax}</p>
    <p>Discount : {discount}</p>
    <p>total : {total}</p>

   <h5>Status Info</h5>
   <p>Status : {" "}
   <spna className={status==="Delivered" ? "purple" : status==="Shipped" ? "green" : "red" } >
    {status}
    </spna> 
    
   </p>
<button onClick={updateHandler}>Process Status</button>
</article>
    </main>
  </div>
  )
}

const ProductCard = ({name,photo,price,quantity,_id}) => (
    <div className='transaction-product-card'>
        <img src={photo} alt='name' />
        <Link to={`/product/${_id}`} >{name}</Link>
        <span>${price} X ${quantity} = ${price*quantity}</span>
    </div>
)

export default TransactionManagement
