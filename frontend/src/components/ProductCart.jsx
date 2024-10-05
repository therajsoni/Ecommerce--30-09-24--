import {FaPlus} from 'react-icons/fa'

const ProductCart = (
    {
        productId,
        price,
        name,
        photo,
        stock,
        handler
    }
) => {
  return (
    <div className='product-card'>
      <img src={`http://localhost:4000/${photo}`} alt='name' />
      <p>{name}</p>
      <span>${price}</span>
      <span>{stock}</span>

<div>
    <button onClick={()=>handler({
      productId,
      price,
      name ,
      photo,
      stock,quantity : 1
    })} > <FaPlus/> </button>
</div>

    </div>
  )
}

export default ProductCart
// props validation know