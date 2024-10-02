import React from 'react'
import {Link} from "react-router-dom";
import ProductCart from '../components/ProductCart';
import Macbook from '../assets/Macbook.jpg'

const Home = () => {

  const addToCartHandler = () => {

  }

  return (
    <div className='home'>
      <section></section>
      <h1>Latest Products
       <Link to={"/search"} className='findmore' >More</Link>        
      </h1>
      <main>

<ProductCart productId={"ad"} name={"Macbook"} price={43445} stock={435} handler={addToCartHandler} photo={Macbook} />

      </main>

    </div>
  )
}

export default Home
