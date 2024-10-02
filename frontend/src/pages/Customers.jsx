import { useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import TableHOC from "../components/TableHOC";
import { FaTrash } from "react-icons/fa";
import avatar1 from '../assets/avatar1.jpg';
import avatar2 from '../assets/avatar2.jpg';

const columns = [
  {
    Header: "Avatar", 
    accessor: "avatar"
  },
  {
    Header: "Name",
    accessor: "name"
  },
  {
    Header: "Gender",
    accessor: "gender"
  },
  {
    Header: "Email",
    accessor: "email"
  },
  {
    Header: "Role",
    accessor: "role"
  },
  {
    Header: "Action",
    accessor : "action"
  }
];

const arr = [
  {
    avatar : <img style={{borderRadius:"50%"}} src={avatar1} alt=""/>,
    name : "A",
    gender : "male",
    email : "email.com",
    role : "user",                   
    action : (<button><FaTrash style={{fontSize:"25px"}} /></button>)
  }
  ,
  {
    avatar : <img  style={{borderRadius:"50%"}} src={avatar2} alt=""/>,
    name : "B",
    gender : "male",
    email : "email.com",
    role : "user",                        
    action : (<button><FaTrash style={{fontSize:"25px"}} /></button>)
  ,}
];
const Customers = () => {
  const [data] = useState(arr);
  return (
    <div  className="admin-container">
      <AdminSidebar/>
      <main>
      <TableHOC
          columns={columns}
          data={data}
          containerClassname="dashboard-customer-box"
          heading="Customer"
        />   
      </main>
    </div>
  )
}

export default Customers