import gts from "../apis/gts";
import ncaa from "../apis/ncaa";

import {
  FIND_TEAMS,
  SELECTED_TEAM,
  FONT_CHANGED,
  FIND_NCAA_TEAMS,
  JERSEY_TEXT_CHANGED
} from "./types";

export const findTeams = term => async dispatch => {
  const response = await gts.get(`/teams?q=${term}`);
  dispatch({ type: FIND_TEAMS, payload: response });
};

export const selectTeam = (t, sports) => async dispatch => {
  const team = await gts.get(`/team?id=${t._id}`);
  const products = await gts.get(`/products?id=${t._id}&sports=${sports}`);
  const payload = { products: products.data, team: team.data };
  dispatch({ type: SELECTED_TEAM, payload });
};

export const fontChanged = font => {
  return {
    type: FONT_CHANGED,
    payload: font
  };
};

export const findNCAATeams = term => async dispatch => {
  const response = await ncaa.get(`/teams?q=${term}`);
  dispatch({ type: FIND_NCAA_TEAMS, payload: response });
};

export const jerseyTextChanged = typeAndText => {
  return {
    type: JERSEY_TEXT_CHANGED,
    payload: typeAndText
  };
};
