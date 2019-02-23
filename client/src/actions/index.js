import gts from "../apis/gts";

import {
  FIND_TEAMS,
  SELECTED_TEAM,
  FONT_CHANGED,
  JERSEY_TEXT_CHANGED
} from "./types";

export const findTeams = term => async dispatch => {
  const response = await gts.get(`/teams?q=${term}`);
  dispatch({ type: FIND_TEAMS, payload: response });
};

export const selectTeam = (
  t,
  sports,
  embellishment = "heat_transfer"
) => async dispatch => {
  const team = await gts.get(`/team?id=${t._id}`);

  let emblishmentMethod = "";
  if (sports === "football") {
    emblishmentMethod = `&embellishmentMethod=${embellishment}`;
  }
  const products = await gts.get(
    `/products?id=${t._id}&sports=${sports}${emblishmentMethod}`
  );
  const payload = { products: products.data, team: team.data };
  dispatch({ type: SELECTED_TEAM, payload });
};

export const fontChanged = font => {
  return {
    type: FONT_CHANGED,
    payload: font
  };
};

export const jerseyTextChanged = typeAndText => {
  return {
    type: JERSEY_TEXT_CHANGED,
    payload: typeAndText
  };
};
