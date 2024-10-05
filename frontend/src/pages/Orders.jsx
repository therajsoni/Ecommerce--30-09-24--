import { useState , useEffect  } from 'react'
import TableHOC from '../components/TableHOC';
import {Link} from "react-router-dom"
import { useSelector  } from 'react-redux'
import { useAllOrdersQuery } from "../redux/api/OrderApi";
import toast from "react-hot-toast";
import { Skeleton } from "../components/Loader";



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

  const {user} = useSelector(state => state.userReducer);

  
  
  const {
    isLoading,isError,error,data
  } = useAllOrdersQuery(user?.id)


  if(isError){
    const err = error;
    toast.error(err.data.message)

  } 

  useEffect(() => {
    // Check if the data is available and Products array exists
    if (data ) {
      setRows(data.Orders.map((i) => ({
        _id: i._id,
        quantity: i.quantity,
        discount: i.discount,
        amount: i.amount,
        status: <span className="red">{i.status}</span>,
        action: <Link to={`/order/${}`}>{i.}</Link>
      })));
    }
  }, [data]);

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

       {
        isLoading ? <Skeleton length={20}/> : 
 <TableHOC columns={column} data={rows} containerClassname= "dashboard-product-box" heading="Orders" true/>
       }
    </div>
  )
}

export default Orders
