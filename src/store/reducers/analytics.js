// types
import { createSlice } from "@reduxjs/toolkit";

// initial state
const initialState = {
  totalHost: [],
  sumRecord: [],
  dashboardData: {},
  downloadUploadHourly: [],
  dailyDataHost: [],
  hosts: [],
  hourlyDataHost: [],
};

// ==============================|| SLICE - MENU ||============================== //

const analytics = createSlice({
  name: "analytics",
  initialState,
  reducers: {
    dashboardApiData(state, action) {
      state.sumRecord = action.payload.sumRecord[0];
      state.downloadUploadHourly = action.payload.downloadUploadHourly;
      state.dashboardData = action.payload.data;
      state.totalHost = action.payload.totalHost;
    },
    hostApiData(state, action) {
      state.dailyDataHost = action.payload.dailyData;
      state.hosts = action.payload.hosts;
      state.hourlyDataHost = action.payload.data;
    },
  },
});

export default analytics.reducer;

export const { dashboardApiData, hostApiData } = analytics.actions;
