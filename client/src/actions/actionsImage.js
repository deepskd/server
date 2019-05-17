import gts from "../apis/gts";

import { RETAILER_IMAGE_STATS, RETAILER_IMAGES } from "./types";

export const getRetailerImageStats = () => async dispatch => {
  const response = await gts.get("/retailerImageCount");
  dispatch({ type: RETAILER_IMAGE_STATS, payload: response });
};

export const getRetailerImages = retailerId => async dispatch => {
  const response = await gts.get(`/images?retailerId=${retailerId}`);
  dispatch({ type: RETAILER_IMAGES, payload: response });
};
