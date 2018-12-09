import gts from "../apis/gts";

export const findTeams = team => async dispatch => {
  const response = await gts.get("/teams?q=bea,OR");
  dispatch({ type: "FIND_TEAMS", payload: response });
};
