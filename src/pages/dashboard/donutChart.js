import PropTypes from "prop-types";
import { useState, useEffect } from "react";

// material-ui
import { useTheme } from "@mui/material/styles";

// third-party
import ReactApexChart from "react-apexcharts";
import { useSelector } from "react-redux";

// chart options
const donutChartOptions = {
  labels: ["Download in GB", "Upload in GB"],
  chart: {
    width: 380,
    type: "pie",
  },
};

// ==============================|| INCOME AREA CHART ||============================== //

const DonutChart = ({ slot }) => {
  const theme = useTheme();
  const analytics = useSelector((state) => state.analytics);

  const { primary, secondary } = theme.palette.text;
  const line = theme.palette.divider;

  const [options, setOptions] = useState(donutChartOptions);

  useEffect(() => {
    setOptions((prevState) => ({
      ...prevState,
      colors: [theme.palette.primary.main, theme.palette.primary[700]],

      tooltip: {
        theme: "light",
      },
    }));
  }, [primary, secondary, line, theme, slot]);

  const [series, setSeries] = useState([10, 20]);

  useEffect(() => {
    console.log([Math.round(analytics.sumRecord.download / 1048576), Math.round(analytics.sumRecord.upload / 1048576)]);
    setSeries([Math.round(analytics.sumRecord.download / 1048576), Math.round(analytics.sumRecord.upload / 1048576)]);
  }, [analytics.sumRecord]);

  const [labels, setLabels] = useState(["Download", "Upload"]);

  return <ReactApexChart options={options} series={series} type="donut" labels={labels} height={500} />;
};

DonutChart.propTypes = {
  slot: PropTypes.string,
};

export default DonutChart;
