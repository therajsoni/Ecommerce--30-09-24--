import  { useState } from 'react'
import AdminSidebar from "../../components/AdminSidebar"

import { Link,useNavigate} from 'react-router-dom'
import { useSelector } from 'react-redux'
import {  useDeleteOrderMutation, useOrderDetailsQuery, useUpdateOrderMutation } from '../../redux/api/OrderApi'
import { Skeleton } from '../../components/Loader'
import { responseToast } from '../../utils/features'




const orderItems = () => {}

const defaultData = {
    shippingInfo : {
        address : "",
    city : "",
    state : "",
    country : "",
    pinCode: "",
    }

}

const TransactionManagement = () => {

  const navigate = useNavigate()   
    
  const {user} = useSelector(state => state.userReducer);

    const {
        isLoading,
        isError,
        data,
        error
    } = useOrderDetailsQuery(user?._id);


    const {shippingInfo : {
address,city,state,country
    } , orderItems,user : {name},status,tax,subtotal,total,discount,shippingCharges  } = data?.order || defaultData;

const [order,setOrder] = useState({})    


// const {
//     name,address,city,country,state,pinCode,subtotal,shippingCharges,tax,discount,total,status
// } = order;

const [deleteOrder] = useDeleteOrderMutation();
const [updateOrder] = useUpdateOrderMutation();

const updateHandler = async() => {
const res = await updateOrder({
    userId : user._id,
    orderId : data.order._id
,});
responseToast(res,navigate,"/admin/transaction");

}

const deleteHandler = async() => {
    const res = await deleteOrder({
        userId : user._id,
        orderId : data.order._id
    ,});
    responseToast(res,navigate,"/admin/transaction");
}

if(isError)return <Navigate to={"/404"}/>

  return (
    <div className="admin-container">
    <AdminSidebar/>
    <main className="product-management">
{
    isLoading ? <Skeleton/>: (
        <>
        <section style={{
    padding : "2rem"
}} >
    <h2>Order Items</h2>
    {
        order.orderItems.map((i)=>(
            <ProductCard key={i} name={i.name}
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

        </>
    )
}
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
