import React, { useState  } from 'react'
import TableHOC from '../components/TableHOC';
import {Link} from "react-router-dom"



const column =  [
  {
    Header : "ID",
    accessor : "_id",
  }
  ,
  {
    Header : "Quantity",
    accessor : "quantity",
  }
  ,
  {
    Header : "Discount",
    accessor : "discount",
  },
  {
    Header : "Amount",
    accessor : "amount",
  }
    
  ,
  {
    Header : "Status",
    accessor : "status",
  }
  ,
  {
    Header : "Action",
    accessor : "action",
  }
]

const Orders = () => {

  const [rows, setRows] = useState([
    {
      _id: "a",
      quantity: 12,
      discount: 2,
      amount: 4556,
      status: <span className="red">Processing</span>,
      action: <Link to={`/order/a`}>View</Link>
    }
  ]);
  

  // const Table = TableHOC(
  //   column,
  //   rows,
  //   "dashboard-product-box",
  //   "Orders",
  //   true
  // );
  
  return (
    <div className='container'>
      <h1 style={{textTransform:"uppercase"}}>My Orders</h1>    
 <TableHOC columns={column} data={rows} containerClassname= "dashboard-product-box" heading="Orders" true/>
    </div>
  )
}

export default Orders
