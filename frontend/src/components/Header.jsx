import React, { useState } from 'react'
import {Link} from "react-router-dom";
import toast from "react-hot-toast";
import {signOut} from "firebase/auth";
import {auth} from "../firebase";

import { FaSearch , FaShoppingBag ,FaSignInAlt,FaSignOutAlt,FaUser} from 'react-icons/fa';

const Header = ({
    user           
}) => {

    
    const [isOpen,setIsOpen] = useState(false)

    const logoutHandler = async() => {
        try {
            await signOut(auth);
            toast.success("SignOut success");
            setIsOpen(false)
        } catch (error) {
            toast.error("SignOut Fail");
        }
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
