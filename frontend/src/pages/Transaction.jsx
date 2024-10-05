import { useState , useEffect } from "react";
import AdminSidebar from "../components/AdminSidebar";
import TableHOC from "../components/TableHOC";
import  {Link} from "react-router-dom"
import { FaPlus} from "react-icons/fa";
import { useSelector  } from 'react-redux'
import { useAllOrdersQuery } from "../redux/api/OrderApi";
import toast from "react-hot-toast";
import { Skeleton } from "../components/Loader";

const columns = [
  {
    Header: "User", 
    accessor: "user"
  },
  {
    Header: "Amount",
    accessor: "Amount"
  },
  {
    Header: "Discount",
    accessor: "discount"
  },
  {
    Header: "Quantity",
    accessor: "quantity"
  },
  {
    Header: "Status",
    accessor: "status"
  },
  {
    Header: "Action",
    accessor : "action"
  }
];

const arr = [
  {
    user : "charas",
    Amount : 4500,
    discount : 460,
    quantity : 3,
    status : <span style={{text:"rgba(255,0,0,.2)" , background : "rgba(255,255,0,0.2)"}} >Processing</span>,                   
    action : (<button className="bg-blue-100" >Manage</button>)
  }
  ,
  {
    user : "charas",
    Amount : 4500,
    discount : 460,
    quantity : 3,
    status : <span style={{text:"rgba(255,0,0,.2)" , background : "rgba(255,255,0,0.2)"}} >Processing</span>,                   
    action : (<button className="bg-blue-100" >Manage</button>)
  },
  {
    user : "charas",
    Amount : 4500,
    discount : 460,
    quantity : 3,
    status : <span style={{text:"rgba(255,0,0,.2)" , background : "rgba(255,255,0,0.2)"}} >Processing</span>,                   
    action : (<button className="bg-blue-100" >Manage</button>)
  }
];


const Transaction = () => {

  const {user} = useSelector(state => state.userReducer);

  
  
  const {
    isLoading,isError,error,data
  } = useAllOrdersQuery(user?.id)

  const [rows, setRows] = useState(arr)

  if(isError){
    const err = error;
    toast.error(err.data.message)

  } 

  useEffect(() => {
    // Check if the data is available and Products array exists
    if (data ) {
      setRows(data.Orders.map((i) => ({
        user : i.user.name ,
        Amount  : i.amount,
        discount:i.discount,
        quantity:i.orderItems.length,
        status:<span className={i.status === "Processing"?"red":i.status==="Shipped"?"green":"purple"}>{i.status}</span> ,                   
        action:<Link to={`/admin/transaction/${i._id}`}>Manage</Link>, 
      })));
    }
  }, [data]);

  return (
    <div  className="admin-container">
      <AdminSidebar/>
      <main>

      </main>

      {
         
         isLoading ? <Skeleton length={20}/> : 
         <TableHOC
         columns={columns}
         data={data}
         containerClassname="dashboard-transaction-box"
         heading="Transaction"
       />   
      }


      <Link to={"/admin/transaction/new"} className="create-transaction-btn" >
      <FaPlus/>
      </Link>
    </div>
  )
}

export default Transaction