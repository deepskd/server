import gts from "../apis/gts";
// import axios from "axios";

import { FETCH_USER } from "./types.js";

export const fetchUser = () => async dispatch => {
  const response = await gts.get("/currentUser");
  return dispatch({ type: FETCH_USER, payload: response.data });
};
