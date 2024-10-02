import {
    Link,
    // Location,
    // navigate, 
    useLocation, 
} from "react-router-dom"
import {RiDashboard2Fill,
RiShoppingBag3Fill,
RiCoupon3Fill
} from "react-icons/ri";
import {AiFillFileText} from "react-icons/ai";
import {IoIosPeople} from "react-icons/io"
import {FaChartBar,FaChartLine,FaChartPie,FaStopwatch,FaGamepad} from "react-icons/fa"
import { useEffect, useState } from "react";
import { CiMenuBurger } from "react-icons/ci";


export default function AdminSidebar() {
 
    const location = useLocation()

    const [showModal,setShowModal] = useState(false)
    const [phoneActive,setPhoneActive] = useState(window.innerWidth < 1100)

    const resizeHandler = () => {
    setPhoneActive(window.innerWidth < 1100)    
    }

    useEffect(()=>{
        window.addEventListener("resize",resizeHandler);
        return () => {
        window.removeEventListener("resize",resizeHandler)
        }
    },[])

    return (
        <>

{
    phoneActive && (<button id="hamburger" onClick={()=>setShowModal(true)} >
        <CiMenuBurger/>
    </button>)
}

    <aside style={
        phoneActive ? {
            width:"20rem",
            height:"100vh",
            position:"fixed",
            top:0,
            left: showModal ? "0" : "-20rem",
            transition:"all 0.5s"
        } : {

        }
    }>
        <h2>Logo.</h2>
        <div>
            <h5>Dashboard</h5>
            <ul>
                <li 
                style={{
                    backgroundColor:location.pathname.includes("/admin/dashboard") ? "rgba(0,115,255,0.1)" : "white"
                }}
                >
<Link to={"/admin/dashboard"} style={{
                    color:location.pathname.includes("/admin/dashboard") ? "rgba(0,115,255)" : "black"
                }}  >
<RiDashboard2Fill/>
Dashboard            
</Link>
</li>
<li  style={{
                    backgroundColor:location.pathname.includes("/admin/product") ? "rgba(0,115,255,0.1)" : "white"
                }} >
<Link to={"/admin/product"} style={{
                    color:location.pathname.includes("/admin/product") ? "rgba(0,115,255)" : "black"
                }} >
<RiShoppingBag3Fill/>
Product       
</Link>
</li>
<li  style={{
                    backgroundColor:location.pathname.includes("/admin/customer") ? "rgba(0,115,255,0.1)" : "white"
                }}>
<Link to={"/admin/customer"} style={{
                    color:location.pathname.includes("/admin/customer") ? "rgba(0,115,255)" : "black"
                }}>
<IoIosPeople/>
Customer           
</Link>
</li>
<li  style={{
                    backgroundColor:location.pathname.includes("/admin/transaction") ? "rgba(0,115,255,0.1)" : "white"
                }}>
<Link to={"/admin/transaction"} style={{
                    color:location.pathname.includes("/admin/transaction") ? "rgba(0,115,255)" : "black"
                }}>
<AiFillFileText/>
Transaction          
</Link>
</li>
            </ul>
        </div>


        <div>
            <h5>CHARTS</h5>
            <ul>
                <li 
                style={{
                    backgroundColor:location.pathname.includes("/admin/chart/bar") ? "rgba(0,115,255,0.1)" : "white"
                }}
                >
<Link to={"/admin/chart/bar"} style={{
                    color:location.pathname.includes("/admin/chart/bar") ? "rgba(0,115,255)" : "black"
                }}  >
<FaChartBar/>
Bar           
</Link>
</li>
<li  style={{
                    backgroundColor:location.pathname.includes("/admin/chart/pie") ? "rgba(0,115,255,0.1)" : "white"
                }} >
<Link to={"/admin/chart/pie"} style={{
                    color:location.pathname.includes("/admin/chart/pie") ? "rgba(0,115,255)" : "black"
                }} >
<FaChartPie/>
Pie     
</Link>
</li>
<li  style={{
                    backgroundColor:location.pathname.includes("/admin/chart/line") ? "rgba(0,115,255,0.1)" : "white"
                }}>
<Link to={"/admin/chart/line"} style={{
                    color:location.pathname.includes("/admin/chart/line") ? "rgba(0,115,255)" : "black"
                }}>
<FaChartLine/>
Line         
</Link>
</li>

            </ul>
        </div>



        <div>
            <h5>APPS</h5>
            <ul>
                <li 
                style={{
                    backgroundColor:location.pathname.includes("/admin/apps/stopwatch") ? "rgba(0,115,255,0.1)" : "white"
                }}
                >
<Link to={"/admin/apps/stopwatch"} style={{
                    color:location.pathname.includes("/admin/app/stopwatch") ? "rgba(0,115,255)" : "black"
                }}  >
<RiDashboard2Fill/>
StopWatch            
</Link>
</li>
<li  style={{
                    backgroundColor:location.pathname.includes("/admin/apps/coupon") ? "rgba(0,115,255,0.1)" : "white"
                }} >
<Link to={"/admin/apps/coupon"} style={{
                    color:location.pathname.includes("/admin/apps/coupon") ? "rgba(0,115,255)" : "black"
                }} >
<RiShoppingBag3Fill/>
Coupon 
</Link>
</li>
<li  style={{
                    backgroundColor:location.pathname.includes("/admin/apps/toss") ? "rgba(0,115,255,0.1)" : "white"
                }}>
<Link to={"/admin/apps/toss"} style={{
                    color:location.pathname.includes("/admin/apps/toss") ? "rgba(0,115,255)" : "black"
                }}>
<IoIosPeople/>
Toss        
</Link>
</li>
{
    phoneActive && <button id="close-sidebar" onClick={()=>setShowModal(false)}>Close</button>
}

            </ul>
        </div>        



    </aside>
    </>
  )
}



