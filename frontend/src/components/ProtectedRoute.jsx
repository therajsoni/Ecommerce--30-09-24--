import { Navigate, Outlet } from "react-router-dom"


export default function ProtectedRoute({
    isAuthenticated
    ,children
    ,adminOnly
    ,admin
    ,redirect = "/"
}) {
  console.log("redirect isAuthenticated" ,isAuthenticated );
  
    if(!isAuthenticated)return <Navigate to={redirect}/>
 
    if(adminOnly && !admin)return <Navigate to={redirect} />

    return (
      children ? children : <Outlet/>

      //  outlet is used to  define this protectedRout as variable <ProtectedRoute/> --> outlet
  )
}
