import gts from "../apis/gts";

import {
  RETAILER_IMAGE_STATS,
  RETAILER_IMAGES,
  ASSIGN_IMAGES_TO_TEAM
} from "./types";

export const getRetailerImageStats = () => async dispatch => {
  const response = await gts.get("/retailerImageCount");
  dispatch({ type: RETAILER_IMAGE_STATS, payload: response });
};

export const getRetailerImages = retailerId => async dispatch => {
  const response = await gts.get(`/images?retailerId=${retailerId}`);
  dispatch({ type: RETAILER_IMAGES, payload: response });
};

export const assignImagesToTeam = (data, retailerId) => async dispatch => {
  const updateResponse = await gts.patch(`/images`, data);
  console.log(`${updateResponse} records updated`);
  const response = await gts.get(`/images?retailerId=${retailerId}`);
  dispatch({ type: ASSIGN_IMAGES_TO_TEAM, payload: response });
};
