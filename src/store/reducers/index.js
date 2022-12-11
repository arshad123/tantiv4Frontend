// third-party
import { combineReducers } from "redux";

// project import
import menu from "./menu";
import analytics from "./analytics";

// ==============================|| COMBINE REDUCERS ||============================== //

const reducers = combineReducers({ menu, analytics });

export default reducers;
