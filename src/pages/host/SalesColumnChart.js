import { useEffect, useState } from "react";

// material-ui
import { useTheme } from "@mui/material/styles";

// third-party
import ReactApexChart from "react-apexcharts";
import { useSelector } from "react-redux";

// chart options
const columnChartOptions = {
  chart: {
    type: "bar",
    height: 430,
    toolbar: {
      show: false,
    },
  },
  plotOptions: {
    bar: {
      borderRadius: 4,
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    show: true,
    width: 8,
    colors: ["transparent"],
  },
  xaxis: {
    categories: [],
  },
  yaxis: {
    title: {
      text: "GB",
    },
  },
  fill: {
    opacity: 1,
  },
  tooltip: {
    y: {
      formatter(val) {
        return `${val} GB`;
      },
    },
  },
  legend: {
    show: true,
    position: "right",
  },
  responsive: [
    {
      breakpoint: 600,
      options: {
        yaxis: {
          show: false,
        },
      },
    },
  ],
};

// ==============================|| SALES COLUMN CHART ||============================== //

const SalesColumnChart = () => {
  const theme = useTheme();
  const analytics = useSelector((state) => state.analytics);

  const { primary, secondary } = theme.palette.text;
  const line = theme.palette.divider;

  const warning = theme.palette.warning.main;
  const primaryMain = theme.palette.primary.main;
  const successDark = theme.palette.success.dark;
  const [categories, setCategories] = useState([]);
  const [series, setSeries] = useState([]);

  const [options, setOptions] = useState(null);

  useEffect(() => {
    if (analytics.dashboardData && analytics.dashboardData.length > 0) {
      const categories = analytics.dashboardData.map((item) => item._id);
      setCategories(categories);

      columnChartOptions.xaxis.categories = categories.map((item) => `${item.day}/${item.month}/${item.year}`);
      console.log("categories", columnChartOptions);
      setOptions(columnChartOptions);
    }
  }, [analytics.dashboardData]);

  useEffect(() => {
    if (analytics.downloadUploadHourly && categories.length > 0) {
      const sr = analytics.totalHost.map((item) => ({
        name: item._id,
        data: analytics.dailyDataHost
          .filter((items) => items._id.hostName === item._id)
          .map((item) => Math.round((item.download + item.upload) / 1024 / 1024)),
      }));
      setSeries(sr);
    }
  }, [analytics.dailyDataHost, analytics.totalHost, categories, analytics.downloadUploadHourly]);

  useEffect(() => {
    setOptions((prevState) => ({
      ...prevState,
      colors: [
        "#FF6633",
        "#FFB399",
        "#FF33FF",
        "#00B3E6",
        "#E6B333",
        "#3366E6",
        "#999966",
        "#99FF99",
        "#B34D4D",
        "#80B300",
        "#809900",
        "#E6B3B3",
        "#6680B3",
        "#66991A",
        "#FF99E6",
        "#CCFF1A",
      ],

      grid: {
        borderColor: line,
      },
      tooltip: {
        theme: "light",
      },
      legend: {
        position: "top",
        horizontalAlign: "right",
        labels: {
          colors: "grey.500",
        },
      },
    }));
  }, [primary, secondary, line, warning, primaryMain, successDark]);

  return (
    <div id="chart">{options && <ReactApexChart options={options} series={series} type="bar" height={430} />}</div>
  );
};

export default SalesColumnChart;
