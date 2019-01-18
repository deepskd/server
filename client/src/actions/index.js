import gts from "../apis/gts";
import {
  FIND_TEAMS,
  SELECTED_TEAM,
  FONT_CHANGED,
  IMAGE_ROTATED
} from "./types";

export const findTeams = term => async dispatch => {
  const response = await gts.get(`/teams?q=${term}`);
  dispatch({ type: FIND_TEAMS, payload: response });
};

export const selectTeam = t => async dispatch => {
  const team = await gts.get(`/team?id=${t._id}`);
  const products = await gts.get(`/products?id=${t._id}`);
  const payload = { products: products.data, team: team.data };
  dispatch({ type: SELECTED_TEAM, payload });
};

export const fontChanged = font => {
  return {
    type: FONT_CHANGED,
    payload: font
  };
};

export const imageRotated = (uniform, direction) => {
  return {
    type: IMAGE_ROTATED,
    payload: { uniform, direction }
  };
};
