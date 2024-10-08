import {BrowserRouter as Router ,
  Routes , 
  Route }
from "react-router-dom"
import { lazy, Suspense,useEffect } from "react"
import Loader from './components/Loader.jsx'
import {Toaster} from "react-hot-toast"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "./firebase.js"
import { useDispatch, useSelector } from "react-redux"
import { getUser } from "./redux/api/userAPi"

//login touch problem

const Dashboard = lazy(()=> import( './pages/Dashboard.jsx'))
const Product = lazy(()=> import( './pages/Products.jsx'))
const Transaction = lazy(()=> import( './pages/Transaction.jsx'))
const Customers = lazy(()=> import( './pages/Customers.jsx'))
const NewProduct = lazy(()=> import( './pages/management/NewProduct.jsx'))
const ProductManagement = lazy(()=> import( './pages/management/ProductManagement.jsx'))
const TransactionManagement = lazy(()=> import( './pages/management/TransactionManagement.jsx'))
const BarCharts = lazy(()=> import( './pages/charts/BarCharts.jsx'))
const LineCharts = lazy(()=> import( './pages/charts/LineCharts.jsx'))
const PieCharts = lazy(()=> import( './pages/charts/PieCharts.jsx'))
const StopWatch = lazy(()=> import( './pages/app/StopWatch.jsx'))
const Coupon = lazy(()=> import( './pages/app/Coupon.jsx'))
const Toss = lazy(()=> import( './pages/app/Toss.jsx'))
const Home = lazy(()=> import( './pages/Home.jsx'))
const Cart = lazy(()=> import( './pages/Cart.jsx'))
const Search = lazy(()=> import( './pages/Search.jsx'))
const Header = lazy(()=>import('./components/Header.jsx'))
const ShippingCart = lazy(()=>import('./pages/Shipping.jsx'))
const Login = lazy(()=>import('./pages/Login.jsx'))
const Orders = lazy(()=>import('./pages/Orders.jsx'))
const OrderDeatail = lazy(()=>import('./pages/OrderDetails.jsx'))
import {userExist,userNotExist} from  "../src/redux/reducer/userReducer.js"
import NotFound from "./components/NotFound.jsx"
import Checkout from "./pages/checkout.jsx"
const ProtectedRoute = lazy(()=>import("../src/components/ProtectedRoute.jsx"))

const App = () => {

  const {
    user,
    loading
  } = useSelector((state)=>state.userReducer);
  console.log(user + "," + loading);
  
  const dispatch = useDispatch();


useEffect(()=>{
  onAuthStateChanged(auth,async(user)=>{
      if(user){
        const data = await getUser(user.uid);
        dispatch(userExist(data.user))
        console.log("Logged in");
      }
      else{
        dispatch(userNotExist())
        console.log("not log");
      }            
  })
},[]);

  // return loading ? <Loader/> : 
  return   (<Router> <Header user={user}/>
      <Suspense fallback={<Loader/>}>
      <Routes>
      <Route path="/" element={<Home/>}></Route>  
      <Route path="/search" element={<Search/>}></Route>  
      <Route path="/cart" element={<Cart/>}></Route>  

      <Route path="/login" element={
<ProtectedRoute isAuthenticated={user ? false : true}>
<Login/>
</ProtectedRoute>
        } ></Route> 

<Route element={<ProtectedRoute isAuthenticated={user ? true : false} />} >
      <Route path="/shipping" element={<ShippingCart/>}></Route>  
      <Route path="/orders" element={<Orders/>}></Route>   
      <Route path="/order/:id" element={<OrderDeatail/>}></Route> 
      <Route path="/payment" element={<Checkout/>}></Route>    
</Route>

{/* admin */}

<Route
element={<ProtectedRoute isAuthenticated={true} adminOnly={true} admin={user?.role === "admin" ? true : false} ></ProtectedRoute>}
>

</Route>

        <Route path="/admin/dashboard" element={<Dashboard/>} ></Route>
        <Route path="/admin/product" element={<Product/>} ></Route>
        <Route path="/admin/customer" element={<Customers/>} ></Route>
        <Route path="/admin/transaction" element={<Transaction/>} ></Route>

{/* charts */}

         <Route path="/admin/chart/bar" element={<BarCharts/>} />
         <Route path="/admin/chart/pie" element={<PieCharts/>} />
         <Route path="/admin/chart/line" element={<LineCharts/>} />
{/* Apps */}
         <Route path="/admin/apps/stopwatch" element={<StopWatch/>} />
         <Route path="/admin/apps/coupon" element={<Coupon/>} />
         <Route path="/admin/apps/toss" element={<Toss/>} />

{/* Management */}
<Route path="/admin/product/new" element={<NewProduct/>} />
<Route path="/admin/product/:id" element={<ProductManagement/>} />
<Route path="/admin/transaction/:id" element={<TransactionManagement/>} />
   
   <Route path="*" element={<NotFound/>}/>
   
      </Routes>
      </Suspense>
      
      <Toaster position="bottom-center"/>

    </Router>
  )

}

export default App  