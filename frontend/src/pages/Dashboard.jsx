import AdminSidebar from "../components/AdminSidebar";
import {BsSearch} from "react-icons/bs"
import {FaRegBell} from "react-icons/fa"
import image from "../assets/user.svg"
import {HiTrendingUp,HiTrendingDown}  from "react-icons/hi"
import data from '../assets/data.json'
import { BarChart,DoughnutChart} from "../components/Charts";
import {BiMaleFemale} from "react-icons/bi"
import DashboardTable from "../components/DashboardTable";

export default function Dashboard() {
  return (
<div className="admin-container">
<AdminSidebar/>
<main className="dashboard">
  <div className="bar">
    <BsSearch/>
    <input type="text" placeholder="Search for data,users,docs"/>
    <FaRegBell/>
    <img src={image} alt="User" />
  </div>
  <section className="widget-container">

<WidgetItem percent={40} amount={40} value={340000} heading={"Revenue"} color = "rgb(0,115,255)" />

<WidgetItem percent={-14} amount={false} value={400} heading={"Users"} color = "rgb(0,198,205)" />

<WidgetItem percent={80} amount={false} value={3400} heading={"Transactions"} color = "rgb(244,195,0)" />

<WidgetItem percent={30} amount={false} value={1000} heading={"Products"} color = "rgb(76,0,255)" />

  </section>

<section className="graph-container">
<div className="revenue-chart" >
  <h2>Revenue & Transaction</h2>
   <BarChart
   data_1={[300,144,433,655,237,755,190]}
   data_2={[200,444,343,556,778,445,900]}
   title_1={"Revenue"}
   title_2={"Transaction"}
   bgColor_1={"rgb(0,115,255)"}
   bgColor_2={"rgba(53,162,235,0.8)"}
  //  horizontal = {true}
   />


</div>
<div className="dashboard-categories" >
  <h2>Inventory</h2>
  <div>
   {
    data.categories.map(i => (
      <CategoryItem key={i.heading}
       heading={i.heading}
       value={70}
       color={`hsl(${i.value},100%,50%)`}
       />
    ))
   }
     </div>
</div>
</section>

<section  className="transaction-container">
<div className="gender-chart" >
  <DoughnutChart labels={["Female","Male"]}  data={[12,19]} backgroundColor={["hsl(340,82%,56%)","rgba(53,162,235,0.8)"]} cutout={90} />
  <h2>Gender Ratio</h2>
  {/* Charts */}
  <p> <BiMaleFemale/> </p> 
</div>
<DashboardTable data={data.transaction} />
</section>



</main>
</div>
)
}

const WidgetItem = ({
  heading,
  value,percent,
  amount,color
}) => <article className="widget">
  <div className="widget-info">
    <p>{heading}</p>
    <h4>{amount ? `$${value}` : value}</h4>
     {
      percent > 0 ? <span className="green" >
        <HiTrendingUp/> +{percent}%
      </span>  :
      <span className="red">
      <HiTrendingDown/> {percent}%
    </span>
     }
  </div>
  <div className="widget-circle" style={{
    background : `conic-gradient(${color} ${Math.abs(percent)/100*360}deg , rgb(255,255,255) 0)`
  }} >
    <span color={color} style={{color,}} >{percent}%</span>
  </div>
</article>

const CategoryItem = ({color,value,heading}) => 
<div
className="category-item"
>
  <h5>{heading}</h5>
  <div style={{
    background:color,
    width:`${value}%`,
  }}>
  </div>
<span>
  {value}%
</span>
</div>
