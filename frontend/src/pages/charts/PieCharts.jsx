import React from "react";
import AdminSidebar from "../../components/AdminSidebar";
import { categories } from "../../assets/data.json";

import { DoughnutChart, PieChart } from "../../components/Charts";

const PieCharts = () => {
  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="chart-container">
        <h1>Pie & Doughnut Charts</h1>
        <section>
          <div>
            <PieChart
              labels={["Processing", "Shipped", "Delivered"]}
              data={[12, 9, 13]}
              backgroundColor={[
                `hsl(110,80%,80%)`,
                `hsl(110,80%,50%)`,
                `hsl(110,40%,50%)`,
              ]}
              offset={[0, 0, 50]}
            />
          </div>
          <h2>Order FulFillment Ratio</h2>
        </section>
        <section>
          <div>
            <DoughnutChart
              labels={categories.map((i) => i.heading)}
              data={categories.map((i) => i.value)}
              backgroundColor={[
                `hsl(110,80%,80%)`,
                `hsl(110,80%,50%)`,
                `hsl(110,40%,50%)`,
              ]}
              offset={[0, 0, 50]}
            />
          </div>
          <h2>Product Categories Ratio</h2>
        </section>
        <section>
          <div>
            <DoughnutChart
              labels={["In Stock", "Out of stock"]}
              data={[40, 20]}
              backgroundColor={[`hsl(269,80%,40%)`, `hsl(53,162,255)`]}
              offset={[0, 80]}
              cutout={"70%"}
            />
          </div>
          <h2>Stock Availability</h2>
        </section>
        <section>
          <div>
            <DoughnutChart
              labels={[
                "Marketing Cost",
                "Discount",
                "Burnt",
                "Production Cost",
                "Net Margin",
              ]}
              data={[32, 18, 5, 20, 25]}
              backgroundColor={[
                `hsl(110,80%,80%)`,
                `hsl(19,80%,40%)`,
                `hsl(69,80%,40%)`,
                `hsl(300,80%,40%)`,
                "rgb(53,162,255)",
              ]}
              offset={[20, 30, 20, 30, 80]}
            />
          </div>
          <h2 style={{ textTransform: "uppercase" }}>Revenue Distribution</h2>
        </section>
        <section>
          <div>
            <PieChart
              labels={["Teenagar(Below 20)", "Adult(20-40)", "Older(above 40)"]}
              data={[30,250,70]}
              backgroundColor={[
                `hsl(10,${80}%,80%)`,
                `hsl(10,${80}%,50%)`,
                `hsl(10,${40}%,50%)`,
              ]}
              offset={[0, 0, 50]}
            />
          </div>
          <h2>Users Age Group</h2>
        </section>
        <section>
          <div>
            <DoughnutChart
              labels={[
                "Admin",
                "Customers"
              ]}
              data={[40,250]}
              backgroundColor={[
                `hsl(335,100%,38%)`,
                `hsl(44,98%,50%)`,
              ]}
              offset={[0, 80]}
            />
          </div>
        </section>
      </main>
    </div>
  );
};

export default PieCharts;
