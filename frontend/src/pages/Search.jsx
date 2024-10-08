import React from "react";
import { useState } from "react";
import ProductCart from "../components/ProductCart";
import Macbook from "../assets/Macbook.jpg";
import { Link } from "react-router-dom";
import { useCategoriesQuery, useSearchProductsQuery } from "../redux/api/ProductAPI";
import toast from "react-hot-toast";
import {Skeleton} from "../components/Loader"
import CartItem from "../components/CartItem";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/reducer/cartReducer";

const Search = () => {
  // const {loadingCategories,data, isLoading, isError, error } = useCategoriesQuery("")

  const {
    data : categoriesResponse , 
    isLoading : loadingCategories,
    isError,
    error
  } = useCategoriesQuery("")

  const dispatch = useDispatch();

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [maxPrice, setmaxPrice] = useState(100000);
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);


  const {
    isLoading : productLoading,
    data : searchedData,
    isError : productIsError,
    error : productError,
  } = useSearchProductsQuery({
    search,sort,category,page,price:maxPrice
  })
  console.log(searchedData);  

  console.log(searchedData);  



  const addToCartHandler = (cartItem) => {
  if(CartItem.stock<1){
    return toast.error("Out of stock");
  }
  dispatch(addToCart(cartItem));
  toast.success("Added to cart");
  };

  const isPreviousPage = page > 1;
  const isNextPage = page < 4;

  if(isError){
    const err = error;
    toast.error(err.data.message);
  }

  if(productIsError){
    const err = productError;
    toast.error(err.data.message)
  }


  return (
    <div className="product-search-page">
      <aside>
        <h2>Filters</h2>
        <div>
          <h4>Sort</h4>
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value={""}>None</option>
            <option value={"asc"}>Price (Low to High)</option>
            <option value={"dsc"}>price (High to Low)</option>
          </select>
        </div>

        <div>
          <h4>Max Price : {maxPrice || ""}</h4>
          <input
            type="range"
            min={100}
            max={100000}
            value={maxPrice}
            onChange={(e) => setmaxPrice(Number(e.target.value))}
          />
        </div>

        <div>
          <h4>Category</h4>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value={""}>All</option>
           {
           !loadingCategories && categoriesResponse?.categories.map((i)=>(
            <option key={i}  value={i} >{
            i.toUpperCase()
            }</option>
           ))}
          </select>
        </div>
      </aside>
      <main>
        <h1>Products</h1>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name..."
        />
        {
          productLoading ? <Skeleton length={10} />  : (
<div className="search-product-list">
         {
          searchedData?.products.map((i,index)=>(
            <ProductCart
            key={index}
            productId={i._id}
            name={i.name}
            price={i.price}
            stock={i.stock}
            handler={addToCartHandler}
            photo={i.photo}
          />
          ))
         }
        </div>
          )
        }
        
     { searchedData && searchedData?.totalPage >= 1 && (
        <article>
        <button
          disabled={!isPreviousPage}
          onClick={() => setPage((prev) => prev - 1)}
        >
          Prev
        </button>
        <span>
          {page} of {4}
        </span>
        <button
          disabled={!isNextPage}
          onClick={() => setPage((prev) => prev + 1)}
        >
          Next
        </button>
      </article>
      )
     }
      </main>
    </div>
  );
};

export default Search;
