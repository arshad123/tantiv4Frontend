import { useEffect } from "react";

// material-ui
import { Box, Grid, Typography } from "@mui/material";

// project import
import OrdersTable from "./OrdersTable";
import MonthlyBarChart from "./MonthlyBarChart";
import SalesColumnChart from "./SalesColumnChart";
import MainCard from "components/MainCard";

// assets
import { dashboardCall, hostsCall } from "pages/dashboard/dashboardFunction";
import { dashboardApiData, hostApiData } from "store/reducers/analytics";
import { dispatch } from "store/index";

const DashboardDefault = () => {
  useEffect(() => {
    (async () => {
      const data = await dashboardCall();
      const hostData = await hostsCall();
      dispatch(dashboardApiData(data.data));
      dispatch(hostApiData(hostData.data));
    })();
  }, []);

  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      {/* row 1 */}

      {/* row 2 */}
      <Grid item xs={12} md={7} lg={6}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">Daily</Typography>
          </Grid>
          <Grid item></Grid>
        </Grid>
        <MainCard content={false} sx={{ mt: 1.5 }}>
          <Box sx={{ pt: 1, pr: 2 }}>
            <SalesColumnChart />
          </Box>
        </MainCard>
      </Grid>
      <Grid item xs={12} md={5} lg={6}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">Total</Typography>
          </Grid>
          <Grid item />
        </Grid>
        <MainCard sx={{ mt: 1.5 }} content={false}>
          <Box sx={{ pt: 1, pr: 2 }}>
            <MonthlyBarChart />
          </Box>
        </MainCard>
      </Grid>

      {/* row 3 */}
      <Grid item xs={12} md={7} lg={12}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">Host wide usage</Typography>
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
