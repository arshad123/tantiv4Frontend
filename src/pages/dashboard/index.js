import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// material-ui
import { Box, Grid, Typography } from "@mui/material";

// project import
import OrdersTable from "./OrdersTable";
import IncomeAreaChart from "./IncomeAreaChart";
import ReportAreaChart from "./ReportAreaChart";
import MainCard from "components/MainCard";
import AnalyticEcommerce from "components/cards/statistics/AnalyticEcommerce";

import DonutChart from "./donutChart";
import { dashboardApiData, hostApiData } from "store/reducers/analytics";
import { dashboardCall, hostsCall } from "./dashboardFunction";

const DashboardDefault = () => {
  const dispatch = useDispatch();
  const analytics = useSelector((state) => state.analytics);

  useEffect(() => {
    (async () => {
      const data = await dashboardCall();
      const hostData = await hostsCall();
      dispatch(dashboardApiData(data.data));
      dispatch(hostApiData(hostData.data));
    })();
  }, []);
  const usageTime = analytics.totalHost.reduce((acc, item) => acc + item.timeUsage, 0);
  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      <Grid item xs={12} sx={{ mb: -2.25 }}>
        <Typography variant="h5">Dashboard</Typography>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticEcommerce
          title="Total Downloads"
          count={
            analytics.sumRecord.download ? parseFloat(analytics.sumRecord.download / 1048576).toFixed(2) + " GB" : "..."
          }
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticEcommerce
          title="Total Uploads"
          count={
            analytics.sumRecord.upload ? parseFloat(analytics.sumRecord.upload / 1048576).toFixed(2) + " GB" : "..."
          }
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticEcommerce
          title="Total Hosts"
          count={analytics.totalHost.length ? analytics.totalHost.length : "..."}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticEcommerce
          title="Total Usage Time"
          count={usageTime ? parseFloat(usageTime / 3600).toFixed(2) + " Hr" : "..."}
        />
      </Grid>

      <Grid item md={8} sx={{ display: { sm: "none", md: "block", lg: "none" } }} />

      {/* row 2 */}
      <Grid item xs={12} md={7} lg={7}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">Hourly Usage</Typography>
          </Grid>
          <Grid item></Grid>
        </Grid>
        <MainCard content={false} sx={{ mt: 1.5 }}>
          <Box sx={{ pt: 1, pr: 2 }}>
            <IncomeAreaChart />
          </Box>
        </MainCard>
      </Grid>
      <Grid item xs={12} md={7} lg={5}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">Total</Typography>
          </Grid>
          <Grid item />
        </Grid>
        <MainCard sx={{ mt: 1.5 }} content={false}>
          <Box sx={{ pt: 1, pr: 2 }}>
            <DonutChart />
          </Box>
        </MainCard>
      </Grid>

      {/* row 3 */}
      <Grid item xs={12} md={7} lg={7}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">Date wise usage</Typography>
          </Grid>
          <Grid item />
        </Grid>
        <MainCard sx={{ mt: 2 }} content={false}>
          <OrdersTable />
        </MainCard>
      </Grid>
    </Grid>
  );
};

export default DashboardDefault;
