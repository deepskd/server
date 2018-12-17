import gts from "../apis/gts";
import { FIND_TEAMS, SELECTED_TEAM } from "./types";

export const findTeams = term => async dispatch => {
  const response = await gts.get(`/teams?q=${term}`);
  dispatch({ type: FIND_TEAMS, payload: response });
};

export const selectTeam = team => async dispatch => {
  const colors = await gts.get(`/team?id=${team._id}`);
  const products = await gts.get(`/products`);
  const payload = { products: products.data, colors: colors.data };
  dispatch({ type: SELECTED_TEAM, payload });
};
