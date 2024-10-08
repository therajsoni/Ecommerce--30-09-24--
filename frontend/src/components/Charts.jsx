
import { Bar, Doughnut, Pie,Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  scales,
  plugins,
  ArcElement,
  PointElement,
  LineElement,
  Filler
} from "chart.js";

// Register components for chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
  Filler
);


const months = ["January", "February", "March", "April", "May", "June","July"];

export const BarChart = ({
    data_1,
    data_2,
    title_1,
    title_2,
    bgColor_1,
    bgColor_2,
    horizontal = false,
    labels = months, 
}) => {
  // Data for the bar chart
  const data = {
    labels : labels,
    datasets: [
      {
        label: title_1,
        data: data_1,
        backgroundColor: bgColor_1, // bar color
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
        barThickness : "flex",
        barPercentage : 1,
        CategoryPercentage : 0.4
      },
      {
        label: title_2,
        data: data_2,
        backgroundColor: bgColor_2, 
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
        barThickness : "flex",
        barPercentage : 1,
        CategoryPercentage : 0.4
      },
    ],
  };

  // Options for the bar chart
  const options = {
    responsive: true,
    indexAxis:horizontal ? "y" : 'x',
    plugins: {
      legend: {
        // display:true,
        display : false,
      },
      title: {
        display : false,
        // display: true,
        // text: "Monthly Sales Data",
      },
    },
    scales:{
        y:{
            beginAtZero : true,
            grid : {
            display : false
        }
    },
    x:{
        grid : {
        display : false
    }
},
    }
  };

  return (
    <div style={{ width: "60%", margin: "auto" }}>
      <Bar width={horizontal ? "200%" : ""} data={data} options={options} />
    </div>
  );
};



export const DoughnutChart = ({
    labels,
    data,
    backgroundColor,
    cutout,
    legends=true,
    offset
}) => {

const doughnutData = {
    labels : labels,
    datasets : [{
        data,backgroundColor,borderWidth:0,offset,
    }]
};

const doughnutOptions = {
    responsive : true,
    plugins : {
        legend : {
            display : legends,
            position : "bottom",
            labels : {
                padding : 40,
            }
        }
    },
    cutout,
};



    return <Doughnut data={doughnutData} options={doughnutOptions} />
}



export const PieChart = ({
  labels,
  data,
  backgroundColor,
  offset
}) => {

const pieChartData = {
  labels : labels,
  datasets : [{
      data,backgroundColor,borderWidth:1,offset,
  }]
};

const pieChartOptions = {
  responsive : true,
  plugins : {
      legend : {
          display : false,
      }
  }
};



  return <Pie data={pieChartData} options={pieChartOptions} />
}


export const LineChart = ({
  data,
  label,   
  backgroundColor,
  borderColor,
  labels = months, 
}) => {
// Data for the bar chart
const datah = {
  labels : labels,
  datasets: [
    {
      fill:true,
      label,
      data,        
      backgroundColor:backgroundColor,
      borderColor:borderColor,
    },
  ],
};

// Options for the bar chart
const options = {
  responsive: true,
  plugins: {
    legend: {
      display : false,
    },
    title: {
      display : false,
    },
  },
  scales:{
      y:{
          beginAtZero : true,
          grid : {
          display : false
      }
  },
  x:{
      grid : {
      display : false
  }
},
  }
};

return (
  <div style={{ width: "60%", margin: "auto" }}>
    <Line  data={datah} options={options} />
  </div>
);
};
