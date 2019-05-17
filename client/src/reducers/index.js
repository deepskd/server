import { combineReducers } from "redux";
import teamsReducer from "./teamsReducer";
import teamProductsReducer from "./teamProductsReducer";
import imageStatsReducer from "./imageStatsReducer";
import imagesReducer from "./imagesReducer";

export default combineReducers({
  teams: teamsReducer,
  teamProducts: teamProductsReducer,
  imageStats: imageStatsReducer,
  images: imagesReducer
});
