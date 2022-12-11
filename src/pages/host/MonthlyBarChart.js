import { useEffect, useState } from "react";

// material-ui
import { useTheme } from "@mui/material/styles";

// third-party
import ReactApexChart from "react-apexcharts";
import { useSelector } from "react-redux";

// chart options
const barChartOptions = {
  chart: {
    type: "bar",
    toolbar: {
      show: false,
    },
  },

  plotOptions: {
    bar: {
      borderRadius: 10,
      dataLabels: {
        position: "top", // top, center, bottom
      },
    },
  },
  dataLabels: {
    enabled: false,
  },
  xaxis: {
    categories: [],
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    show: false,
  },
  grid: {
    show: false,
  },
};

// ==============================|| MONTHLY BAR CHART ||============================== //

const MonthlyBarChart = () => {
  const theme = useTheme();
  const analytics = useSelector((state) => state.analytics);
  const { primary, secondary } = theme.palette.text;
  const info = theme.palette.info.light;

  const [series, setSeries] = useState([
    {
      data: [],
    },
  ]);

  const [options, setOptions] = useState(barChartOptions);

  useEffect(() => {
    const sr = [];
    const category = [];
    analytics.totalHost.forEach((item) => {
      sr.push(Math.round((item.download + item.upload) / 1024 / 1024));
      category.push(item._id);
    });

    setSeries([
      {
        data: sr,
      },
    ]);
    console.log("category=====", sr);
    setOptions((prevState) => ({
      ...prevState,
      colors: [info],
      xaxis: {
        categories: category,
        labels: {
          style: {
            colors: [secondary, secondary, secondary, secondary, secondary, secondary, secondary],
          },
        },
      },
      tooltip: {
        theme: "light",
      },
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [primary, info, secondary, analytics.totalHost]);

  return (
    <div id="chart">
      <ReactApexChart options={options} series={series} type="bar" height={428} />
    </div>
  );
};

export default MonthlyBarChart;
