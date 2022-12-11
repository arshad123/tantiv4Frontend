import PropTypes from "prop-types";
import { useState, useEffect } from "react";

// material-ui
import { useTheme } from "@mui/material/styles";

// third-party
import ReactApexChart from "react-apexcharts";
import { useSelector } from "react-redux";
import moment from "moment";

// chart options
const areaChartOptions = {
  chart: {
    height: 450,
    type: "area",
    toolbar: {
      show: false,
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: "smooth",
    width: 2,
  },
  grid: {
    strokeDashArray: 0,
  },
};

// ==============================|| INCOME AREA CHART ||============================== //

const IncomeAreaChart = ({ slot }) => {
  const analytics = useSelector((state) => state.analytics);
  console.log(analytics.downloadUploadHourly);
  const [series, setSeries] = useState([]);

  const [categories, setCategories] = useState([]);
  const theme = useTheme();

  const { primary, secondary } = theme.palette.text;
  const line = theme.palette.divider;

  const [options, setOptions] = useState(areaChartOptions);

  useEffect(() => {
    setOptions((prevState) => ({
      ...prevState,
      colors: [theme.palette.primary.main, theme.palette.primary[700]],
      xaxis: {
        categories: categories,
        labels: {
          style: {
            colors: [
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
            ],
          },
        },
        axisBorder: {
          show: true,
          color: line,
        },
        tickAmount: slot === "month" ? 11 : 7,
        stroke: {
          curve: "smooth",
        },
      },
      yaxis: {
        labels: {
          style: {
            colors: [secondary],
          },
        },
      },
      grid: {
        borderColor: line,
      },
      tooltip: {
        theme: "light",
      },
    }));
  }, [categories, series]);

  useEffect(() => {
    if (analytics.downloadUploadHourly.length) {
      const series = [
        {
          name: "Download",
          data: analytics.downloadUploadHourly.map((item) => parseFloat(item.download / 1048576).toFixed(2)),
        },
        {
          name: "Upload",
          data: analytics.downloadUploadHourly.map((item) => parseFloat(item.upload / 1048576).toFixed(2)),
        },
      ];
      setSeries(series);
      const categories = analytics.downloadUploadHourly.map(
        (item) => `${item._id.day}-${item._id.month}-${item._id.year} ${item._id.hour}:00- ${item._id.hour + 1}:00`,
      );
      setCategories(categories);
    }
  }, [analytics.downloadUploadHourly]);

  return <ReactApexChart options={options} series={series} type="area" height={450} />;
};

IncomeAreaChart.propTypes = {
  slot: PropTypes.string,
};

export default IncomeAreaChart;
