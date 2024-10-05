import {Link} from "react-router-dom";
import {FaTrash} from "react-icons/fa"

const CartItem = ({
  cartItem,
  incrementHandler,
  decrementHandler,
  removeHandler,
}) => {

  const {productId,photo,name,price,quantity,stock} = cartItem

  return (
    <div className='cart-item'>
      <img src={`${`http://localhost:4000/${photo}`}`} alt={name}/>
      <article>
       <Link to={`/product/${productId}`}>{name}</Link>    
       <span>${price}</span>
      </article>
      <div>
        <button onClick={decrementHandler}>-</button>
        <p>{quantity}</p>
        <button onClick={decrementHandler} >+</button>
      </div>
      <button>
        <FaTrash onClick={removeHandler}/>
      </button>
    </div>
  )
}

export default CartItem
