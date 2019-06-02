import gts from "../apis/gts";
import { FIND_ORDERS } from "./types";

export const findOrder = orderName => async dispatch => {
  const response = await gts.get(`/orders?orderName=${orderName}`);
  dispatch({ type: FIND_ORDERS, payload: response.data });
};
