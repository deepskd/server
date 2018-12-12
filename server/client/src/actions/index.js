import gts from "../apis/gts";
import { FIND_TEAMS } from "./types";

export const findTeams = team => async dispatch => {
  const response = await gts.get(`/teams?q=${team}`);
  dispatch({ type: FIND_TEAMS, payload: response });
};
