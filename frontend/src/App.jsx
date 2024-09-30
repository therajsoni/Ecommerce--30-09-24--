import {BrowserRouter as Router ,
  Routes , 
  Route 
}
from "react-router-dom"
import { lazy, Suspense } from "react"
import Loader from './components/Loader.jsx'
const Dashboard = lazy(()=> import( './pages/Dashboard.jsx'))
const Product = lazy(()=> import( './pages/Products.jsx'))
const Transaction = lazy(()=> import( './pages/Transaction.jsx'))
const Customers = lazy(()=> import( './pages/Customers.jsx'))

const App = () => {
  return (
    <Router>
      <Suspense fallback={<Loader/>}>
      <Routes>

{/* admin */}

        <Route path="/admin/dashboard" element={<Dashboard/>} ></Route>
        <Route path="/admin/product" element={<Product/>} ></Route>
        <Route path="/admin/customer" element={<Customers/>} ></Route>
        <Route path="/admin/transaction" element={<Transaction/>} ></Route>

{/* charts */}



      </Routes>
      </Suspense>
    </Router>
  )
}

export default App  