import {Link} from "react-router-dom";
import ProductCart from '../components/ProductCart';
import Macbook from '../assets/Macbook.jpg'
import { useLatestProductsQuery } from "../redux/api/ProductAPI";
import toast from "react-hot-toast"
import { Skeleton } from "../components/Loader";

const Home = () => {

  const addToCartHandler = () => {

  }

  const {data,isLoading,isError} = useLatestProductsQuery("")

  if(isError)toast.error("Cannot Fetch the products");

  return (
    // isLoading true 
    <div className='home'>
      <section></section>
      <h1>Latest Products
       <Link to={"/search"} className='findmore' >More</Link>        
      </h1>
      <Skeleton width="80vw"/>
      <main>

        {  data?.products.map((i,index)=>(<ProductCart key={index} productId={i._id} name={i.name} price={i.price} stock={i.stock} handler={addToCartHandler} photo={i.photo} />
          ))
        }

      </main>

    </div>
  )
}

export default Home
