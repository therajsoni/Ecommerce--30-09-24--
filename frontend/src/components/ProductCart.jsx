import React from 'react'
import {FaPlus} from 'react-icons/fa'

const a = ''
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
      <img src={photo} alt='name' />
      <p>{name}</p>
      <span>${price}</span>
      <span>{stock}</span>

<div>
    <button onClick={()=>handler()} > <FaPlus/> </button>
</div>

    </div>
  )
}

export default ProductCart
