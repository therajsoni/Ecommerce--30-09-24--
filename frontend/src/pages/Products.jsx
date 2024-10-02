import { useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import TableHOC from "../components/TableHOC";
import  {Link} from "react-router-dom"
import shoeImg from "../assets/download.jpg"
import macbook from "../assets/macbook.png"
import { FaPlus } from "react-icons/fa";

const columns = [
  {
    Header: "Photo", 
    accessor: "photo"
  },
  {
    Header: "Name",
    accessor: "name"
  },
  {
    Header: "Price",
    accessor: "price"
  },
  {
    Header: "Stock",
    accessor: "stock"
  },
  {
    Header: "Action",
    accessor: "action"
  }
];

const arr = [
  {
    photo : <img src={shoeImg} alt=""/>,
    name : "Puma Shoes Air Jorder cook Nigga 2023",
    price : 690,
    stock : 3,
    action : <Link to="/admin/product/a">Manage</Link>                        
  }
  ,
  {
    photo : <img src={macbook} alt=""/>,
    name : "Mac book",
    price : 690000,
    stock : 213,
    action : <Link to="/admin/product/b">Manage</Link>   
  }
];

export default function Products() {
  const [data] = useState(arr); // Using the state properly

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main>
        {/* Using JSX to render the TableHOC component */}
        <TableHOC
          columns={columns}
          data={data}
          containerClassname="dashboard-product-box"
          heading="Products"
        />   
      </main>
      <Link to={"/admin/product/new"} className="create-product-btn" >
      <FaPlus/>
      </Link>
    </div>
  );
}
