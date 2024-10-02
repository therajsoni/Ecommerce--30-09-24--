import React from "react";
import AdminSidebar from "../../components/AdminSidebar";
import { LineChart } from "../../components/Charts";

const months = ["January", "February", "March", "April", "May", "June", "July"];

const LineCharts = () => {
  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="chart-container">
        <h1>Line Charts</h1>
        <section>
          <LineChart
            labels={months}
            data={[
              200, 444, 444, 556, 778, 455, 990, 1444, 256, 447, 1000, 1200,
            ]}
            label="Users"
            backgroundColor={"rgba(53,162,255,0.5)"}
            borderColor={"rgb(53,162,255)"}
          />
          <h2>ACTIVE USERS</h2>
        </section>
        <section>
          <LineChart
            labels={months}
            data={[
              24000, 14400, 24100, 34300, 90000, 20000, 25600, 44700, 99000,
              144400, 100000, 120000,
            ]}
            label="Revenue"
            backgroundColor={"rgba(129,80%,40%,0.4)"}
            borderColor={"rgb(129,80%,40%)"}
          />
          <h2>Total Products (SKU)</h2>
        </section>
        <section>
        <LineChart
labels={months}
data={[
  40,60,244,100,143,120,41,47,50,56,32
]}
backgroundColor={"rgba(269,80%,40%,0.4)"}
borderColor={"rgb(269,80%,40%)"}
/>
<h2>Total Revenue</h2>
        </section>
        <section>
        <LineChart
labels={months}
data={[
  24000, 14400, 24100, 34300, 90000, 20000, 25600, 44700, 99000,
              144400, 100000, 120000,
]}
backgroundColor={"rgba(129,80%,40%,0.4)"}
borderColor={"rgb(129,80%,40%)"}
label={"Discount"}
/>
<h2>Discount Allotted</h2>
        </section>
      </main>
    </div>
  );
};

export default LineCharts;
