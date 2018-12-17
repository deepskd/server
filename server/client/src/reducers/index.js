import { combineReducers } from "redux";
import teamsReducer from "./teamsReducer";
import teamProductsReducer from "./teamProductsReducer";

export default combineReducers({
  teams: teamsReducer,
  teamProducts: teamProductsReducer
});
