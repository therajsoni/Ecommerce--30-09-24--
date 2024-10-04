import { useEffect, useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import TableHOC from "../components/TableHOC";
import  {Link} from "react-router-dom";
import shoeImg from "../assets/download.jpg";
import macbook from "../assets/macbook.png";
import { FaPlus } from "react-icons/fa";
import {useAllProductsQuery} from '../redux/api/ProductAPI';
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { Skeleton } from "../components/Loader";


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
    photo : <img src={shoeImg} alt="Shoe"/>,
    name : "Puma Shoes Air Jordan 2023",
    price : 690,
    stock : 3,
    action : <Link to="/admin/product/a">Manage</Link>                        
  }
  ,
  {
    photo : <img src={macbook} alt="Macbook"/>,
    name : "MacBook Pro",
    price : 690000,
    stock : 213,
    action : <Link to="/admin/product/b">Manage</Link>   
  }
];

export default function Products() {

  const {user} = useSelector(state => state.userReducer);

  const {data,isLoading,isError,error} = useAllProductsQuery(user?._id); // Fetching products based on user ID
  
  const [rows,setRows] = useState(arr); // Set initial state with the dummy data

  useEffect(() => {
    // Check if the data is available and Products array exists
    if (data && data.Products) {
      setRows(data.Products.map((i) => ({
        photo: <img src={`http://localhost:4000/${i.photo}`} alt={i.name} />, 
        name: i.name,
        price: i.price,
        stock: i.stock,
        action: <Link to={`/admin/product/${i._id}`}>Manage</Link>
      })));
    }
  }, [data]);

  // Display error using toast if there's an API error
  if (isError) {
    toast.error(error?.data?.message || "An error occurred while fetching products");
  }

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main>
        {/* TableHOC is rendered if rows are available */}
        <TableHOC
          columns={columns}
          data={rows}
          containerClassname="dashboard-product-box"
          heading="Products"
          {...(rows.length > 6 && { pagination: true })} // Pass pagination if there are more than 6 items
        />   
      </main>
      {
        isLoading 
          ? <Skeleton /> 
          : <Link to="/admin/product/new" className="create-product-btn"><FaPlus /> Create New Product</Link>
      }
    </div>
  );
}
