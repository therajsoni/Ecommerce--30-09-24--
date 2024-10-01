import { useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import TableHOC from "../components/TableHOC";
import  {Link} from "react-router-dom"
import { FaPlus, FaTrash } from "react-icons/fa";
import avatar1 from '../assets/avatar1.jpg';
import avatar2 from '../assets/avatar2.jpg';

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
  const [data] = useState(arr);
  return (
    <div  className="admin-container">
      <AdminSidebar/>
      <main>
      <TableHOC
          columns={columns}
          data={data}
          containerClassname="dashboard-transaction-box"
          heading="Transaction"
        />   
      </main>
      <Link to={"/admin/transaction/new"} className="create-transaction-btn" >
      <FaPlus/>
      </Link>
    </div>
  )
}

export default Transaction