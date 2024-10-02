import React, { useState } from 'react'
import {Link} from "react-router-dom";
import { FaSearch , FaShoppingBag ,FaSignInAlt,FaSignOutAlt,FaUser} from 'react-icons/fa';

const user = {
    _id : "1",
    role : "admin"
}
const Header = () => {

    
    const [isOpen,setIsOpen] = useState(false)

    const logoutHandler = () => {
        setIsOpen(false)
    }

  return (
   <nav className='header' >
    <Link onClick={()=>setIsOpen(false)} style={{textTransform:"uppercase"}} to={"/"}>Home</Link>
    <Link onClick={()=>setIsOpen(false)} to={"/search"}>{<FaSearch/>}</Link>
    <Link onClick={()=>setIsOpen(false)} to={"/cart"}>{<FaShoppingBag/>}</Link>
    {
        user?._id ? (
            <>
            <button onClick={()=>setIsOpen(prev => !prev)}>
                <FaUser></FaUser>
            </button>
            <dialog open={isOpen}>
                <div>{
                    user?.role === "admin" && (
                        <Link onClick={()=>setIsOpen(false)} to={"/admin/dashboard"} >Admin</Link>
                    )
                    }
                    <Link onClick={()=>setIsOpen(false)} to={"/orders"}>Orders</Link>
                    <button onClick={logoutHandler} ><FaSignOutAlt/></button>
                    </div>
            </dialog>
            </>
        ) : (<FaSignInAlt></FaSignInAlt>)
    }
   </nav>
  )
}

export default Header
